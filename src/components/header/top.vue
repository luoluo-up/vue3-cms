<template>
    <el-card shadow="always">
        <div class="header">
            <div class="left">
                <div class="icon_box hover">
                    <el-tooltip class="box-item" effect="dark" :content="$t('header.top.expend')" placement="bottom">
                        <el-icon @click="expendBtn">
                            <Expand />
                        </el-icon>
                    </el-tooltip>
                </div>
                <div class="icon_box">
                    <el-breadcrumb separator-icon="ArrowRight">
                        <template v-for="item in $useRoute.matched">
                            <el-breadcrumb-item v-if="item.meta.title" :to="{ path: item.path }"
                                @click="clickBread(item)">
                                <el-icon>
                                    <component :is="item.meta.icon"></component>
                                </el-icon>
                                {{ $t(`${item.meta.title}`) }}
                            </el-breadcrumb-item>
                        </template>

                    </el-breadcrumb>
                </div>
            </div>
            <div class="right">
                <div class="icon_box">
                    <el-tooltip class="box-item" effect="dark" :content="$t('header.top.refresh')" placement="bottom">
                        <el-button icon="Refresh" circle @click="clickRefresh" />
                    </el-tooltip>
                </div>
                <div class="icon_box">
                    <el-tooltip class="box-item" effect="dark" :content="$t('header.top.fullScreen')"
                        placement="bottom">
                        <el-button icon="FullScreen" circle @click="fullScreen" />
                    </el-tooltip>
                </div>
                <div class="icon_box">
                    <el-tooltip class="box-item" effect="dark" :content="$t('header.top.set')" placement="bottom">
                        <el-button icon="Setting" circle @click="settingOpen = true" />
                    </el-tooltip>
                </div>
                <div class="icon_box">
                    <img :src="userStore.userInfo.avatar" alt="">
                </div>
                <div>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ userStore.userInfo.userName }}
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>

                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="quitBtn">{{ $t('header.top.quitLogin') }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <el-drawer v-model="settingOpen" direction="rtl" :before-close="handleClose" :show-close="false">

                <template #header="{ close }">
                    <h2 style="font-size: 24px;color: #000;">{{ $t('header.setting.title') }}</h2>
                    <el-button type="danger" @click="close">
                        <el-icon class="el-icon--left">
                            <CircleCloseFilled />
                        </el-icon>
                        Close
                    </el-button>
                </template>
                <div class="setting_box">
                    <span>{{ $t('header.setting.setColor') }}</span>
                    <el-color-picker v-model="settingColor" size="small" @change="changePiker" />
                </div>
                <div class="setting_box">
                    <span>{{ $t('header.setting.setModel') }}</span>
                    <el-switch v-model="layoutStore.modelStyle" inline-prompt class="mb-2" active-icon="Moon"
                        inactive-icon="Sunny" size="large" @change="changeModel" />
                </div>
                <div class="setting_box">
                    <span>{{ $t('header.setting.setLanguage') }}</span>
                    <el-switch v-model="layoutStore.language" inline-prompt class="mb-2" active-text="中"
                        inactive-text="英" size="large" @change="changeLanguage" />
                </div>
            </el-drawer>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import useLayoutStore from '@/stores/modules/layout';
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import useUserStore from '@/stores/modules/user'
import emitter from '@/utils/emitter';
import { ElMessage } from 'element-plus';
import { reqChangeState } from '@/request/api';





emitter.on('quitBtn', quitBtn)
const layoutStore = useLayoutStore() // layoutStore仓库
const userStore = useUserStore() // 用户数据仓库
const $router = useRouter()
const $useRoute = useRoute() // 路由数据
let settingColor = ref('') // 颜色拾取器数据
// let language = ref(true) // 中英文数据
const i18n = useI18n()  // i18n数据
// 设置按钮
let settingOpen = ref(false)
// 刷新方法


// 收缩侧边栏
function expendBtn() {
    layoutStore.isCollapse = !layoutStore.isCollapse
}
// 点击面包屑
function clickBread(data: any) {
    emitter.emit('pushBread', data)
}
// 刷新
function clickRefresh() {
    layoutStore.isRefresh = !layoutStore.isRefresh
    // $router.go(0)
}
// 全屏方法
function fullScreen() {
    // 是否全屏，否为null
    let full = document.fullscreenElement
    // console.log(full)
    if (!full) {
        // document自带的全屏方法
        document.documentElement.requestFullscreen()
    } else {
        // document自带的推出全屏方法
        document.exitFullscreen()
    }
}
// 关闭setting盒子
const handleClose = (done: () => void) => {
    done()
}
// 暗黑模式改变

function changeModel() {
    let html = document.documentElement
    layoutStore.modelStyle ? html.className = 'dark' : html.className = ''
}
// 主题颜色改变
function changePiker() {
    let html = document.documentElement
    html.style.setProperty('--el-color-primary', settingColor.value)
}
// 语言切换
function changeLanguage() {
    if (layoutStore.language) {
        sessionStorage.setItem('lang', 'zh')
        i18n.locale.value = 'zh'
    } else {
        sessionStorage.setItem('lang', 'en')
        i18n.locale.value = 'en'
    }
}
// 退出登录按钮
async function quitBtn() {
    if (sessionStorage.getItem('token')) {
        await reqChangeState(sessionStorage.getItem('token') as string, false)
        ElMessage.closeAll()
    }
    sessionStorage.clear()
    userStore.clearUserInfo()
    $router.push('/login')
    ElMessage({
        message: '已退出登录',
        type: 'success',
    })
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        display: flex;
        font-size: 24px;

        .hover:hover {
            cursor: pointer;
        }

        .icon_box {
            display: flex;
            align-items: center;
            font-size: 20px;
            margin-right: 15px;
            text-wrap: nowrap;
        }
    }

    .right {
        display: flex;
        align-items: center;

        // 去除el-dropdown 鼠标经过出现黑色边框
        :deep(.el-tooltip__trigger:focus-visible) {
            outline: unset;
        }

        .icon_box {
            width: 32px;
            height: 32px;
            overflow: hidden;
            margin-right: 15px;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .el-dropdown {
            &:hover {
                cursor: pointer;
            }
        }
    }
}

.setting_box {
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-size: 20px;

    span {
        margin-right: 18px;
        font-weight: 700;
    }
}
</style>