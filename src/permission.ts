import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/stores/modules/user'
import pinia from './stores/index'
import { ElMessage } from 'element-plus'
import i18n from './i18n'

let userStore = useUserStore(pinia) // 用户数据仓库

router.beforeEach(async (to, from, next) => {
    NProgress.start()  // 路由进度条
    // 用户跳转路由时存在 token 即：正常已登录状态
    if (to.path == '/404') {
        next()
        return
    }
    if (sessionStorage.getItem('token')) {
        next()
    } else {
        // 用户token 不存在时
        if (to.path == '/login') {
            next()
        } else {
            ElMessage({
                message: '请先登录',
                type: 'warning',
            })
            next({ path: '/login', query: { redirct: to.path } })
        }
    }
});

router.afterEach((to, from) => {
    NProgress.done()
    document.title = 'MyAdmin-' + i18n.global.t(`${to.meta.title}`)
});

// NProgress.configure({
//     easing: 'ease', // 动画方式
//     speed: 500, // 递增进度条的速度
//     showSpinner: false, // 是否显示加载 icon
//     trickleSpeed: 200, // 自动递增间隔
//     minimum: 0.3 // 初始化时的最小百分比
// })


// // APP配置
// #nprogress.bar {
//     background - color: red!important;
// }