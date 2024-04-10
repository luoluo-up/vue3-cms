<template>
    <div>
        SKU管理
        <input type="text" v-for="(item, index) in 10" :key="index" @change="change(index)" ref="ipt"
            @input="change(index)">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let ipt = ref()
function change(index: number) {
    console.log(ipt.value[index].value);
}
</script>

<style scoped></style>