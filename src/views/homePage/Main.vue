<template>
    <router-view v-slot="{ Component }" v-if="showMain">
        <transition name="main">
            <keep-alive>
                <component :is="Component" :key="$route.path" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import useLayoutStore from '@/stores/modules/layout';
import { watch, ref, nextTick } from 'vue';

let showMain = ref(true)
const layoutStore = useLayoutStore()
watch(() => layoutStore.isRefresh, () => {
    if (layoutStore.isRefresh) {
        showMain.value = false
        nextTick(() => {
            showMain.value = true
            layoutStore.isRefresh = !layoutStore.isRefresh
        })
    }
})

</script>

<style scoped>
.main-enter-from {
    opacity: 0;
}

.main-enter-to {
    opacity: 1;
}

.main-enter-active {
    transition: all 2s;
}

p {
    height: 600px;
    background-color: purple;
}
</style>