import { defineStore } from "pinia";
import { reqGetUserinfo } from "@/request/api";
import { constRoutes, asyncRoutes, anyRoutes } from "@/router/routes";
import router from "@/router";
import { cloneDeep } from "lodash";
import type { TypeuserInfo } from "@/types/types";
import { ElMessage } from "element-plus";



let useUserStore = defineStore('User', {
    state: () => {
        return {
            userInfo: {} as TypeuserInfo,
            routes: [] as string[],
        }
    },
    actions: {
        // 退出登录清空数据
        clearUserInfo() {
            this.userInfo = {}
        },
        // 获取用户数据
        async update() {
            // 更新用户信息
            const result = await reqGetUserinfo()
            ElMessage.closeAll()
            if (!result) return
            // 如果获取不到用户信息 就需要重新登录
            if (result.status == -1) {
                return
            }
            this.userInfo = result.data
            const arr = filterRoutes(cloneDeep(asyncRoutes), result.data.routes)
            const list = [...arr, ...anyRoutes]
            list.forEach((item: any) => {
                router.addRoute(item)
            });
            this.routes = [...constRoutes, ...arr]
            sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        },
    },
    getters: {}
})
// 异步路由过滤方法
function filterRoutes(asyncRoutes: any, routes: any) {
    return asyncRoutes.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterRoutes(item.children, routes)
            }
            return item
        }
    });
}

export default useUserStore