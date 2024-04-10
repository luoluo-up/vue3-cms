<template>
    <el-drawer v-model="drawer" title="分配菜单与按钮的权限" direction="rtl" :before-close="closeDrawer">
        <el-tree style="max-width: 600px" :data="asyncRoutes" :props="defaultProps" show-checkbox ref="treeRef"
            v-loading="loadingStore.loading" default-expand-all node-key="name" :default-checked-keys="defaultCheck"
            @node-click="handleNodeClick" />
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import useLoadingStore from '@/stores/modules/loading';
import { reqDistribute } from '@/request/api'
import useUserStore from '@/stores/modules/user';
import { ElMessage } from 'element-plus';

const handleNodeClick = (data: Tree) => {
    console.log(data)
}
const getData = inject('getData') as Function
const userStore = useUserStore() // 用户数据仓库
const loadingStore = useLoadingStore() // 请求中数据仓库
const props = defineProps(['asyncRoutes', 'defaultCheck', 'userToken'])
interface Tree {
    label: string
    children?: Tree[],
}
let treeRef = ref()
const defaultProps = {
    children: 'children',
    label: 'label',
}
let drawer = ref(false) // 分配权限抽屉
defineExpose({
    drawer
})


// 点击确认
async function confirm() {
    const arr = treeRef.value.getCheckedNodes(false, true).map((item: any) => {
        return item.name
    })
    const result = await reqDistribute(arr, props.userToken) as any
    if (!result) return
    if (result.status == 1) {
        userStore.update()
        await getData()
        ElMessage.closeAll()
        ElMessage({
            message: result.message,
            type: 'success',
        })
    }
    drawer.value = false
    treeRef.value!.setCheckedKeys([], false)
}
// 取消
function cancel() {
    drawer.value = false
    treeRef.value!.setCheckedKeys([], false)
}
// 关闭菜单权限窗口
function closeDrawer(done: () => void) {
    treeRef.value!.setCheckedKeys([], false)
    done()
}






</script>

<style scoped></style>