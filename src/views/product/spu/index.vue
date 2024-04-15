<template>
    <div>
        <!-- 品牌数据弹窗 -->
        <el-dialog v-model="addDialog" :title="title" :before-close="handleClose">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" @submit.native.prevent>
                <el-form-item label="品牌名称" prop="brandName">
                    <el-input v-model="ruleForm.brandName" autocomplete="off" type="text" />
                </el-form-item>
                <el-form-item label="品牌Logo" prop="brandLogo">
                    <!-- 上传图片 -->
                    <el-upload class="avatar-uploader" action="#" :http-request="sendRequest" :show-file-list="false">
                        <img v-if="ruleForm.brandLogo" :src="ruleForm.brandLogo" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loadingStore.loading">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import emitter from '@/utils/emitter';
import useLoadingStore from '@/stores/modules/loading';

let addDialog = ref(true) // 品牌弹窗是否出现
const ruleFormRef = ref<FormInstance>() // form表单类型
// 品牌弹窗表单数据
let ruleForm = reactive({
    brandName: '',
    brandLogo: '',
    brandId: '',
    sortID: ''
})
// 品牌弹窗表单数据规则
const rules = reactive<FormRules<typeof ruleForm>>({
    brandName: [
        { required: true, message: '品牌名称不能为空', trigger: 'blur', },
    ],
    brandLogo: [
        { required: true, message: '品牌Logo不能为空', trigger: 'blur', },
    ]
})
const props = defineProps(['title'])
const loadingStore = useLoadingStore()



// 改变弹窗状态事件,由父组件调用
function changeDialog(flag: boolean, data: any) {
    addDialog.value = flag
    if (data) {
        ruleForm = Object.assign(ruleForm, data)
    } else {
        ruleForm.brandLogo = ''
        ruleForm.brandName = ''
        ruleForm.brandId = ''
        ruleForm.sortID = ''
    }
}
defineExpose({
    changeDialog
})
// 品牌数据弹窗关闭事件
const handleClose = () => {
    addDialog.value = false
    ruleFormRef.value!.clearValidate()
}
// 品牌数据弹窗取消事件
function resetForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.resetFields()
    addDialog.value = false
}
// 品牌数据弹窗确认事件
function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            // 刷新数据
            emitter.emit('getTableData')
            // 关闭窗口事件
            handleClose()
        } else {
            console.log('error submit!')
            return false
        }
    })
}

let file = {} as any
// el-upload 上传请求,自定义请求方法
function sendRequest(data: any) {
    console.log(data.file);

    // blob:http://localhost:5173/efa6598d-d562-4275-b59f-1bf3f3c07c93 这种格式地址 通过file 或者 base64都可以转换
    ruleForm.brandLogo = window.URL.createObjectURL(data.file)
    file = data
    // base64 转换方法
    // const reader = new FileReader();
    // // 读取文件内容
    // reader.readAsDataURL(data.file);
    // // 当文件读取完成时的回调函数
    // reader.onload = () => {
    //     // 将文件内容转换为base64格式  reader.result 是获取到的file name
    //     let base64 = reader.result as string
    //     // 转为blob
    //     let arr = base64.split(','), mime = arr[0].match(/:(.*?);/)![1],
    //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     let bdata = new Blob([u8arr], { type: mime })
    //     // console.log(bdata);
    //     // 最终获取到 blob:http://localhost:5173/efa6598d-d562-4275-b59f-1bf3f3c07c93 这种格式地址
    //     ruleForm.brandLogo = window.URL.createObjectURL(bdata)
    //     // console.log( ruleForm.brandLogo);
    // };
}

</script>


<style scoped lang="scss">
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;


}
</style>

<!-- 上传组件样式 -->
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>