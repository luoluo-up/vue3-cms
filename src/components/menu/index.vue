<template>
    <template v-for="item in routes" :key="item.path">
        <template v-if="!item.meta.hidden">
            <!-- 单个 -->
            <el-menu-item :index="item.path" v-if="!item.children" @click="clickMenu(item)">
                <el-icon :is="item.meta.icon">
                    <component :is="item.meta.icon" />
                </el-icon>
                <template #title>
                    <span> {{ $t(`${item.meta.title}`) }}</span>
                </template>
            </el-menu-item>
            <!-- 只有一个子路由 -->
            <el-menu-item :index="item.children[0].path" v-else-if="item.children && item.children.length == 1"
                @click="clickMenu(item)">
                <el-icon :is="item.meta.icon">
                    <component :is="item.children[0].meta.icon" />
                </el-icon>

                <template #title>
                    <span> {{ $t(`${item.children[0].meta.title}`) }}</span>
                </template>
            </el-menu-item>
            <!-- 多个子路由 -->
            <el-sub-menu v-else :index="item.path">

                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span> {{ $t(`${item.meta.title}`) }}</span>
                </template>
                <Menu :routes="item.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="ts" name="Menu">
import emitter from '@/utils/emitter';
defineProps(['routes'])


function clickMenu(data: any) {
    emitter.emit('pushBread', data)
}

</script>



<style scoped lang="scss">
.el-menu {
    span {
        margin-right: 30px;
        font-size: 16px;
        user-select: none
    }
}
</style>