import { defineStore } from "pinia";

let useLayoutStore = defineStore('Aside', {
    state: () => {
        return {
            isCollapse: false, // 是否折叠侧边栏
            isRefresh: false, // 是否刷新
            userName: '', // 用户名
            modelStyle: false, // 暗黑模式
            language: sessionStorage.getItem('lang') == 'zh' ? true : false, // 中英文切换
        }
    },
    actions: {},
    getters: {}
})

export default useLayoutStore