<template>
    <!-- 列表区域 -->
    <div class="list_box">
        <!-- 表格 -->
        <el-card>
            <!-- 按钮区域 -->
            <div class="top_btns">
                <el-button type="primary" icon="Plus" @click="createNew($parent)" :disabled="loadingStore.loading">
                    新建
                </el-button>
                <el-button type="danger" icon="Delete" @click="deleteMore($parent)" :disabled="loadingStore.loading">
                    批量删除
                </el-button>
            </div>
            <!-- 表格区域 -->
            <div class="table_box">
                <el-table ref="multipleTableRef" :data="showData" style="width: 100%" max-height="600"
                    :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }" row-key="id"
                    v-loading="loadingStore.loading" select-on-indeterminate @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="30" reserve-selection />
                    <el-table-column label="用户账号">
                        <template #default="scope">{{ scope.row.userNumber }}</template>
                    </el-table-column>
                    <el-table-column label="用户名">


                        <template #default="scope">{{ scope.row.userName }}</template>
                    </el-table-column>
                    <el-table-column label="性别">

                        <template #default="scope">{{ scope.row.userSex }}</template>
                    </el-table-column>
                    <el-table-column label="手机号码">

                        <template #default="scope">{{ scope.row.userPhone }}</template>
                    </el-table-column>
                    <el-table-column label="用户角色">

                        <template #default="scope">{{ scope.row.userRole }}</template>
                    </el-table-column>
                    <el-table-column label="创建时间">

                        <template #default="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column label="状态">

                        <template #default="scope">
                            <el-switch v-model="scope.row.state" @change="changeState(scope.$index, scope.row)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template #default="scope">
                            <el-button size="small" @click="limitsBtn(scope.row)">
                                分配权限
                            </el-button>
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-popconfirm title="是否确认删除?" @confirm="handleDelete(scope.$index, scope.row, $parent)">
                                <template #reference>
                                    <el-button size="small" type="danger">
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <createDialog ref="createDialogRef"></createDialog>
        <editDialog ref="editDialogRef" :userData="userData"></editDialog>
        <limitsDrawer ref="limitsDrawerRef" :asyncRoutes="asyncRoutes" :defaultCheck="defaultCheck"
            :userToken="userToken">
        </limitsDrawer>
    </div>
</template>

<script setup lang="ts" name="Table">
import { reqDelUserData, reqChangeState } from '@/request/api';
import { ElMessage } from 'element-plus';
import { reactive, ref, defineAsyncComponent, inject } from 'vue'
import { ElTable } from 'element-plus'
import type { User } from '@/types/types';
import useLoadingStore from '@/stores/modules/loading';
import createDialog from './tableDialog/createDialog.vue';
import editDialog from './tableDialog/editDialog.vue';
import { reqGetAsyncRoute, reqgetMenuRoutes } from '@/request/api'
import useUserStore from '@/stores/modules/user';



const getData = inject('getData') as Function
const limitsDrawer = defineAsyncComponent(() => import('./tableDialog/limitsDrawer.vue'))
let props = defineProps(['showData'])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const loadingStore = useLoadingStore() // 请求中数据仓库
const userStore = useUserStore() // 请求中数据仓库
const multipleSelection = ref<User[]>([])  // 表格数据选中的数据
const createDialogRef = ref() // 获取新建用户弹窗组件
const editDialogRef = ref() // 获取编辑用户弹窗组件
let userData = reactive({}) // 传递给编辑组件的数据
const limitsDrawerRef = ref() // 获取分配权限抽屉组件
let asyncRoutes = ref([]) // 分配权限的数据
let defaultCheck = ref([] as string[]) // 默认选中的数组
let userToken = ref() // 当前点击分配权限的用户id

// 选项框变化事件
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
}
// 新建按钮
async function createNew(parent: any) {
    createDialogRef.value.showDialog = true
}
// 批量删除
async function deleteMore(parent: any) {
    if (multipleSelection.value.length == 0) {
        ElMessage({
            message: '请选择删除的数据',
            type: 'warning'
        })
        return
    }
    let idArr: string[] = []
    multipleSelection.value.forEach(item => {
        idArr.push(item.id)
    })
    const noDel = idArr.some(item => {
        if (item == userStore.userInfo.userId) {
            return true
        }
    })
    if (noDel) {
        ElMessage({
            message: '无法删除自己',
            type: 'warning',
        })
        return
    }
    const result = await reqDelUserData(idArr) as any
    if (!result) return
    await getData()
    ElMessage.closeAll()
    if (result.status == 1) {
        ElMessage({
            message: result.message,
            type: 'success',
        })
    }
    if (result.status == 0) {
        ElMessage({
            message: result.message,
            type: 'error',
        })
    }
    // 清除选中数据
    multipleTableRef.value!.clearSelection()
}
// 用户状态改变
async function changeState(index: number, row: User) {
    // console.log(index, row)
    const result = await reqChangeState(row.token as string, row.state)
    if (!result) return
    ElMessage.closeAll()
}
// 表格数据编辑
const handleEdit = (index: number, row: User) => {
    editDialogRef.value.showDialog = true
    userData = Object.assign(userData, row)
}
// 表格数据删除
async function handleDelete(index: number, row: User, parent: any) {
    // console.log(index, row)
    let idArr = [row.id]  // 删除需要传递删除的id数组
    const noDel = idArr.some(item => {
        if (item == userStore.userInfo.userId) {
            return true
        }
    })
    if (noDel) {
        ElMessage({
            message: '无法删除自己',
            type: 'warning',
        })
        return
    }
    const result = await reqDelUserData(idArr) as any
    if (!result) return
    await getData()
    ElMessage.closeAll()
    if (result.status == 1) {
        ElMessage({
            message: result.message,
            type: 'success',
        })
    }
    if (result.status == 0) {
        ElMessage({
            message: result.message,
            type: 'error',
        })
    }
    // 被删除的数据取消选中状态
    multipleTableRef.value!.toggleRowSelection(row, false)
}
// 分配权限按钮
async function limitsBtn(row: any) {
    // console.log(row);
    userToken.value = row.token
    if (!asyncRoutes.value.length) {
        const result = await reqGetAsyncRoute()
        // 后端传递过来的全部可选菜单数据
        asyncRoutes.value = result.data.asyncRoutes
    }
    // 用户已有的菜单权限数
    // const data = await reqgetMenuRoutes(row.token)
    defaultCheck.value = []
    row.routes.filter((item: string) => {
        filterRoutes(asyncRoutes.value, item)
    })
    limitsDrawerRef.value.drawer = true
}
// 过滤默认选中的菜单权限数组
function filterRoutes(asyncRoutes: any, name: string) {
    asyncRoutes.filter((route: any) => {
        if (route.name == name) {
            if (route.children) {
            } else {
                defaultCheck.value.push(name)
            }
        } else {
            if (route.children) {
                filterRoutes(route.children, name)
            }
        }
    })
}
</script>

<style scoped lang="scss">
.list_box {
    margin: 20px 0;

    .table_box {
        margin-top: 20px;
        border-top: 1px solid #e4e7ed;

        .el-table-column {
            text-align: center;
        }
    }
}
</style>