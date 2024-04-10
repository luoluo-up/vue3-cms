<template>
    <div class="common-layout">
        <el-container>
            <el-aside>
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-main>
                    <Main></Main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup lang="ts" name="Layout">
import Aside from '@/views/homePage/Aside.vue'
import Header from '@/views/homePage/Header.vue'
import Main from '@/views/homePage/Main.vue'
import useLayoutStore from '@/stores/modules/layout';

</script>

<style scoped lang="scss">
.common-layout {
    width: 100%;
    height: 100vh;
    min-width: 950px;

    .el-container {
        width: 100%;
        height: 100%;

        .el-aside {
            background-color: #000;
            width: auto;
            // :deep(.el-sub-menu__title) {
            //     padding: 0 20px !important;
            // }

            // :deep(.el-menu-item) {
            //     padding: 0 40px !important;
            // }
        }

        .el-header {
            height: auto;
        }
    }
}
</style>