import { defineStore } from "pinia";

let useLoadingStore = defineStore('Loading', {
    state: () => {
        return {
            loading: false // 是否加载中
        }
    },
    actions: {},
    getters: {}
})

export default useLoadingStore