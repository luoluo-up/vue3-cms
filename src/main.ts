import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/permission'  // 路由加载进度条
import router from './router'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式样式
import i18n from './i18n'
import pinia from './stores'
import useUserStore from '@/stores/modules/user'


const app = createApp(App)
let userStore = useUserStore(pinia) // 用户数据仓库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


// 当浏览器刷新时，查看是否需要重新加载数据
if (sessionStorage.getItem('token')) {
    if (!userStore.userInfo.userName) {
        // console.log('userStore仓库中数据丢失,使用仓库的方法重新获取数据');
        await userStore.update()
    }
}

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(ElementPlus)


app.mount('#app')



