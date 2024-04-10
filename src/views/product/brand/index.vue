<template>
    <div>
        <Table @click-edit="clickEdit">
            <el-button type="primary" style="margin-bottom: 20px;" @click="clickAdd">新增品牌</el-button>
        </Table>
        <Dialog ref="addDialogRef" :title="title"></Dialog>
    </div>
</template>

<script setup lang="ts" name="productBrand">
import Table from '@/components/brand/table.vue'
import Dialog from '@/components/brand/dialog.vue'
import { ref } from 'vue'

const addDialogRef = ref() // 获取弹窗组件实例
let title = ref('') // 弹窗标题
// 点击添加品牌
function clickAdd() {
    title.value = '添加品牌'
    addDialogRef.value.changeDialog(true)
}
// 点击表格中编辑按钮
function clickEdit(value: string, data: any) {
    title.value = value
    addDialogRef.value.changeDialog(true, data)
}
</script>
