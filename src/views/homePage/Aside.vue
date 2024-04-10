<template>
    <el-menu background-color="#000" class="el-menu-vertical-demo" text-color="#fff"
        :default-active="useRoute().matched[useRoute().matched.length - 1].path" router
        :collapse="layoutStore.isCollapse">
        <!-- unique-opened -->
        <div class="logo">
            <img src="http://8.222.176.28/logo.png" alt="">
            <span v-show="!layoutStore.isCollapse">Vue-Admin</span>
        </div>
        <Menu :routes="userStore.routes"></Menu>
    </el-menu>
</template>

<script setup lang="ts">
import Menu from '@/components/menu/index.vue'
import { useRoute } from 'vue-router';
import useLayoutStore from '@/stores/modules/layout';
import useUserStore from '@/stores/modules/user'

const layoutStore = useLayoutStore()
const userStore = useUserStore()

</script>

<style scoped lang="scss">
.logo {
    height: 50px;
    background-color: 001529;
    display: flex;
    align-items: center;
    // justify-content: center;
    padding: 0 20px;
    box-sizing: border-box;

    img {
        width: 30px;
    }

    span {
        margin-left: 5px;
        text-wrap: nowrap;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
    }
}

.el-menu {
    border-right: 0;
}

:deep(.el-menu-item:hover) {
    color: #ffd04b;
}

:deep(.el-sub-menu__title:hover) {
    color: #ffd04b;
}

:deep(.el-menu-item.is-active) {
    color: #2E95FB;
    background-color: #fff;
}
</style>