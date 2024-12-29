<template>
    <div>
        <!-- 品牌数据弹窗 -->
        <el-dialog v-model="addDialog" :title="title" :before-close="handleClose">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" @submit.native.prevent>
                <el-form-item label="品牌名称" prop="brandName">
                    <el-input v-model="ruleForm.brandName" autocomplete="off" type="text" />
                </el-form-item>
                <el-form-item label="品牌Logo" prop="brandLogo">
                    <el-upload ref="uploadRef" class="upload-demo" action="http://127.0.0.1:8080/uploadImg"
                        :auto-upload="false" :limit="1" :on-exceed="handleExceed" :show-file-list="false"
                        @change="change" :on-success="success" :on-error="error" :data="ruleForm" :headers="header">
                        <template #trigger>
                            <img v-if="ruleForm.brandLogo" :src="ruleForm.brandLogo" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </template>
                        <div class="btns">
                            <el-button class="ml-3" type="success" @click="resetForm(ruleFormRef)">
                                取消
                            </el-button>
                            <el-button class="ml-3" type="success" @click="submitUpload(ruleFormRef)">
                                上传
                            </el-button>
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import { reqUploadBrandName } from '@/request/api'
import emitter from '@/utils/emitter';


let addDialog = ref(false) // 品牌弹窗是否出现
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
const props = defineProps(['title'])    // 弹窗标题
const uploadRef = ref<UploadInstance>()  // 上传组件
const header = {
    token: sessionStorage.getItem('token')
}


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
    ruleForm.brandLogo = ''
    ruleForm.brandName = ''
    ruleForm.brandId = ''
    ruleForm.sortID = ''
}
// 取消按钮事件
function resetForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    addDialog.value = false
    formEl.resetFields()
    ruleForm.brandLogo = ''
    ruleForm.brandName = ''
    ruleForm.brandId = ''
    ruleForm.sortID = ''
}
// 图片选择改变事件
const change: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    ruleForm.brandLogo = window.URL.createObjectURL(uploadFile.raw as File)
    // ruleForm.brandLogo = uploadFile.name
}
// 上传按钮事件
const submitUpload = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            addDialog.value = false
            if (props.title == '添加品牌') {
                uploadRef.value!.submit()
            } else {
                const result = await reqUploadBrandName(ruleForm.brandId, ruleForm.brandName)
                if (!result) return
                if (result) {
                    emitter.emit('getTableData')
                }
                uploadRef.value!.submit()
            }
        } else {
            console.log('error submit!')
            return false
        }
    })
}
// 一次只能上传一张图片，覆盖掉上次的图片
const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
}
// 上传成功事件
function success(res: any) {
    ElMessage.closeAll()
    if (res.status == 1) {
        ElMessage({
            showClose: true,
            message: '上传成功',
            type: 'success',
            grouping: true,
        })
        emitter.emit('getTableData')
    } else {
        ElMessage({
            showClose: true,
            message: '上传失败',
            type: 'error',
            grouping: true,
        })
    }
    handleClose()
}

// 上传失败事件
function error() {
    ElMessage.closeAll()
    ElMessage({
        showClose: true,
        message: '上传失败',
        type: 'error',
        grouping: true,
    })
    handleClose()
}
</script>



<!-- 上传组件样式 -->
<style>
.btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 20px 0
}

.el-icon.avatar-uploader-icon {
    width: 200px !important;
    height: 200px !important;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    border: 1px dashed #6fb6ff;
    border-radius: 5px;
    box-sizing: border-box
}

.el-upload img {
    width: 200px;
    height: 200px;
}
</style>