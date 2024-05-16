<template>
    <div>

        <el-card>
            <slot> </slot>
            <el-table :data="tableData" style="width: 100%" border v-loading="loadingStore.loading"
                element-loading-text="加载中...">
                <el-table-column type="index" width="100" label="序号" />
                <el-table-column prop="sortID" label="产品序列" />
                <el-table-column prop="brandName" label="品牌名称" />
                <el-table-column label="品牌LOGO" width="350">
                    <template #default="scope">
                        <!-- {{ scope.row.brandLogo }} -->
                        <el-image :src="scope.row.brandLogo">
                            <template #error>
                                <div class="image-slot">
                                    <img src="@/assets/imgErr.png" alt="" style="width: 50px;">
                                </div>
                            </template>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                        <el-popconfirm title="是否确认删除?" @confirm="handleDelete(scope.$index, scope.row)"
                            :hide-after="150">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 10]"
                :total="total" background layout="total, sizes, prev, pager, next, jumper"
                @current-change="getTableData" @size-change="getTableData" />
        </el-card>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqGetBrandData, reqDelBrandData } from '@/request/api';
import emitter from '@/utils/emitter';
import { ElMessage } from 'element-plus';
import useLoadingStore from '@/stores/modules/loading';


emitter.on('getTableData', getTableData)
let tableData = ref([])   // 表格数据
const currentPage = ref(1) // 当前是第几页
const pageSize = ref(3) // 一页显示多少个
let total = ref(0) //表格数据总共多少条
const loadingStore = useLoadingStore()
const emits = defineEmits(['click-edit'])

// 表格编辑事件
function handleEdit(index: number, row: any) {
    console.log('编辑品牌', row);

    emits('click-edit', '编辑品牌', row)
}
// 表格删除事件
async function handleDelete(index: number, row: any) {
    const result = await reqDelBrandData(row.brandId) as any
    if (!result) return
    await getTableData()
    // if (result.status == 1) {
    //     ElMessage({
    //         type: 'success',
    //         message: result.message
    //     })
    // } else {
    //     ElMessage({
    //         type: 'error',
    //         message: result.message
    //     })
    // }
}
// 获取表格数据事件
async function getTableData() {
    const pageData = {
        currentPage: currentPage.value,
        pageSize: pageSize.value
    }
    const result = await reqGetBrandData(pageData)
    if (!result) return
    tableData.value = result.data.tableData
    total.value = result.data.total
    // ElMessage.closeAll()
}
onMounted(() => {
    getTableData()
})
</script>

<style scoped lang="scss">
:deep(.el-table) {
    .cell {
        text-align: center;

        img {
            width: 60%;
        }
    }
}

.el-pagination {
    margin: 30px 0;
    display: flex;
    justify-content: center;
}

.el-dialog {
    .el-form {
        padding: 20px;
        box-sizing: border-box;

        .el-form-item {
            img {
                width: 100%;
            }
        }
    }
}
</style>