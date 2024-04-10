<template>
    <div>
        <!-- 新建用户弹窗 -->
        <el-dialog v-model="showDialog" title="新建用户" width="800" :before-close="handleClose">
            <el-form label-position="right" label-width="auto" :model="userData" ref="ruleFormRef" :rules="rules">
                <!-- :rules="rules" -->
                <div class="ipt_box">
                    <el-form-item label="用户账号" prop="userNumber">
                        <el-input v-model="userData.userNumber" placeholder="请输入用户账号" />
                    </el-form-item>
                    <el-form-item label="Email" prop="Email">
                        <el-input v-model="userData.Email" placeholder="请输入Email" />
                    </el-form-item>
                </div>
                <div class="ipt_box">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="userData.userName" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="手机号码" prop="userPhone">
                        <el-input v-model="userData.userPhone" placeholder="请输入手机号码" />
                    </el-form-item>
                </div>
                <div class="ipt_box">
                    <el-form-item label="密码" prop="passWord">
                        <el-input v-model="userData.passWord" placeholder="请输入密码" type="password" show-password />
                    </el-form-item>
                    <el-form-item label="创建时间" prop="date">
                        <el-date-picker v-model="userData.date" style="width: 100%;" type="date" format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
                    </el-form-item>
                </div>
                <div class="ipt_box">
                    <el-form-item label="性别" prop="userSex">
                        <el-radio-group v-model="userData.userSex" class="ml-4">
                            <el-radio value="男" size="large">男</el-radio>
                            <el-radio value="女" size="large">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="所属部门" prop="section">
                        <el-input v-model="userData.section" placeholder="请输入所属部门" />
                    </el-form-item>
                </div>
                <el-form-item label="个人简介" prop="brief">
                    <el-input v-model="userData.brief" placeholder="请输入个人简介" :autosize="{ minRows: 2, maxRows: 3 }"
                        type="textarea" autocomplete="off" />
                </el-form-item>
                <el-form-item label="用户角色" prop="userRole">
                    <el-select v-model="userData.userRole" autocomplete="off" class="m-2" placeholder="请输入用户角色"
                        size="large">
                        <el-option label="管理员" value="管理员"></el-option>
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="游客" value="游客"></el-option>
                        <el-option label="钻石VIP" value="钻石VIP"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogCancel">取消</el-button>
                    <el-button type="primary" @click="dialogConfirm(ruleFormRef)">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reqCreateUserData } from '@/request/api';
import { ref, reactive, inject } from 'vue'
import type { User } from '@/types/types';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

let showDialog = ref(false) // 是否展示弹窗
defineExpose({
    showDialog
})
// 新建用户弹窗数据
let userData = reactive<User>({
    id: '',
    userNumber: '',
    Email: '',
    userName: '',
    userPhone: '',
    passWord: '',
    date: getTime(),
    userSex: '男',
    section: '',
    brief: '',
    userRole: '',
    state: false,
})
// 新建用户弹窗默认数据
const defaultUserData = { ...userData }
const ruleFormRef = ref<FormInstance>()
// 新建用户弹窗表单验证规则
const rules = reactive<FormRules>({
    userNumber: [
        { required: true, message: '用户账号不能为空', trigger: 'blur' },
    ],
    Email: [
        { required: true, message: 'Email不能为空', trigger: 'blur' },
    ],
    userName: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    userPhone: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
    ],
    passWord: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ],
    date: [
        { required: true, message: '时间不能为空', trigger: 'blur' },
    ],
    userSex: [
        { required: true, message: '性别不能为空', trigger: 'blur' },
    ],
    section: [
        { required: true, message: '部门不能为空', trigger: 'blur' },
    ],
    brief: [
        { required: true, message: '简介不能为空', trigger: 'blur' },
    ],
    userRole: [
        { required: true, message: '用户角色不能为空', trigger: 'blur' },
    ],
})
const getData = inject('getData') as Function




// 新建用户弹窗默认关闭事件
const handleClose = (done: () => void) => {
    done()
}
// 新建用户弹窗取消按钮
function dialogCancel() {
    showDialog.value = false
    userData = Object.assign(userData, defaultUserData)
    ruleFormRef.value!.resetFields()
}
// 新建用户弹窗确定按钮
async function dialogConfirm(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            showDialog.value = false
            const result = await reqCreateUserData(userData) as any
            if (!result) return
            userData = Object.assign(userData, defaultUserData)
            await getData()
            ElMessage.closeAll()
            if (result.status == 1) {
                ElMessage({
                    type: 'success',
                    message: result.message
                })
            } else {
                ElMessage({
                    type: 'error',
                    message: result.message
                })
            }

        } else {
            console.log('error submit!', fields)
        }
    })
}
// 禁止选中的时间
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
// 获取当前时间
function getTime() {
    const datetime = new Date()
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    const date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
    return year + '-' + month + '-' + date
}
</script>

<style scoped lang="scss">
.ipt_box {
    display: flex;
    justify-content: space-between;

    .el-form-item {
        width: 48%;

        .el-radio.el-radio--large {
            height: auto;
        }
    }
}
</style>