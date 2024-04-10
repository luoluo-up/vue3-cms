<template>
    <div>
        <Search></Search>
        <Table :showData="showData"></Table>
    </div>
</template>

<script setup lang="ts">
import Search from '@/components/aclComs/user/serach.vue'
import Table from '@/components/aclComs/user/table.vue'
import { reqGetAclUserData } from '@/request/api';
import { onMounted, provide, ref } from 'vue';


let tableData = ref([])
let showData = ref([])


// 获取数据
async function getData() {
    const result = await reqGetAclUserData()
    if (!result) return
    if (result.status == 1) {
        tableData.value = result.data.userData
        showData.value = [...tableData.value]
    }
}
provide('getData', getData)
onMounted(function () {
    getData()
})
provide('tableData', tableData)
provide('showData', showData)
</script>

<style scoped></style>