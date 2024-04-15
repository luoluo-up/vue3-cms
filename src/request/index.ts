import axios from 'axios'
import { ElMessage } from 'element-plus'
import pinia from '@/stores'
import useLoadingStore from '@/stores/modules/loading'
import router from '@/router'
import emitter from '@/utils/emitter'

const loadingStore = useLoadingStore(pinia)
const service = axios.create({
    baseURL: 'http://127.0.0.1:8080/myApi',
    timeout: 5000,
    headers: {
        "Content-Type": 'application/json;charset=utf-8'
    }
})
// 请求拦截
service.interceptors.request.use((config) => {
    loadingStore.loading = true
    if (sessionStorage.getItem('token')) {
        config.headers.token = sessionStorage.getItem('token')
    }
    return config
})


// 响应拦截器
service.interceptors.response.use((res) => {
    // console.log('响应拦截器得到的数据', res.data);
    loadingStore.loading = false
    // ElMessage.closeAll()
    if (res.data.code == 200 && res.data.status == -1) {
        // console.log('当返回的数据 status 为-1时,即为token过期,让用户重新登录并提示token过期');
        // emitter.emit('quitBtn')
        // 如果获取不到用户信息 就需要重新登录
        sessionStorage.clear()
        router.push('/login')
        ElMessage({
            showClose: true,
            message: res.data.message,
            type: 'error',
            grouping: true,
        })
        return
    }
    if (res.data.code == 200 && res.data.status == 1) {
        ElMessage({
            message: res.data.message,
            type: 'success',
            grouping: true,
        })
    }
    if (res.data.code == 200 && res.data.status == 0) {
        ElMessage({
            message: res.data.message,
            type: 'error',
            grouping: true,
        })
    }
    return res.data
}, (err) => {
    try {
        loadingStore.loading = false
        const status = err.response.status
        let message
        switch (status) {
            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 500:
                message = '服务器出现问题'
                break
            default:
                message: '网络出现问题'
                break
        }
        ElMessage({
            message,
            type: 'error'
        })
    } catch (error) {
        ElMessage({
            message: '请求地址错误',
            type: 'error'
        })
    }
})
export default service