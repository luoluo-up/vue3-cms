<template>
    <div class="box">
        <div class="login_form">
            <div class="title">My-Admin</div>
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" class="demo-ruleForm"
                hide-required-asterisk>
                <el-form-item prop="userNumber">
                    <el-input v-model="ruleForm.userNumber" autocomplete="off" size="large"
                        placeholder="Please Input userName" prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="ruleForm.passWord" autocomplete="off" size="large" type="password"
                        placeholder="Please Input passWord" prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item prop="verify">
                    <el-input v-model="ruleForm.verify" autocomplete="off" size="large" type="password"
                        placeholder="Please Input verify code" prefix-icon="WarningFilled" show-password />
                </el-form-item>
                <el-button type="primary" style="width: 100%;" @click="submitForm(ruleFormRef)"
                    :loading="loadingStore.loading">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElNotification } from 'element-plus'
import { reqLogin, reqChangeState } from '@/request/api'
import useLoadingStore from '@/stores/modules/loading';
import useUserStore from '@/stores/modules/user'
import pinia from '@/stores';




let userStore = useUserStore(pinia) // 用户数据仓库
const $router = useRouter()
const $route = useRoute()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    userNumber: 'admin',
    passWord: '123456',
    verify: '123456'
})
const loadingStore = useLoadingStore()
const rules = reactive<FormRules<typeof ruleForm>>({
    userNumber: [
        { required: true, message: 'userNumber不能为空', trigger: 'change', },
    ],
    passWord: [
        { required: true, message: 'passWord不能为空', trigger: 'change', },
    ],
    verify: [
        { required: true, message: 'userNumber不能为空', trigger: 'change', },
    ]
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const result = (await reqLogin(ruleForm)) as any
            if (!result) return
            if (result.code == 200 && result.status == 1) {
                sessionStorage.setItem('token', result.token)
                await reqChangeState(result.token, true)
                await userStore.update()
                // 登录的状态为true
                ElMessage.closeAll()
                ElMessage({
                    message: result.message,
                    type: 'success',
                })
                ElNotification({
                    title: getTime(),
                    message: '登录成功',
                    type: 'success',
                })
                if ($route.query.redirct) {
                    $router.push(($route.query.redirct as string))
                } else {
                    $router.push('/')
                }
            }
            // if (result.code == 200 && result.status == 0) {
            //     ElMessage({
            //         showClose: true,
            //         message: result.message,
            //         type: 'error',
            //         grouping: true,
            //     })
            // }
        } else {
            console.log('error submit!')
            return false
        }
    })
}
// 根据当前时间 返回对应文字
function getTime() {
    const date = new Date()
    const hours = date.getHours()
    if (hours < 6) {
        return 'Hi,早上好'
    } else if (hours < 12) {
        return 'Hi,上午好'
    } else if (hours < 18) {
        return 'Hi,下午好'
    } else {
        return 'Hi,晚上好'
    }
}
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100vh;
    background: url('@/assets/login_bg.jpg') no-repeat;
    background-size: cover;
    position: relative;

    .title {
        font-size: 40px;
        text-align: center;
        font-weight: 700;
        margin-bottom: 40px;
        color: #fff;
    }

    .login_form {
        border-radius: 10px;
        padding: 50px 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, .5);

        .el-form-item {
            width: 300px;
            margin-bottom: 40px;
        }
    }
}
</style>
