<template>
    <div>
        <!-- 搜索 -->
        <div class="search_box">
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <span>用户账号</span>
                        <el-input v-model="userNumber" placeholder="请输入搜索用户账号"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <span>用户名</span>
                        <el-input v-model="userName" placeholder="请输入搜索用户名"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <span>性别</span>
                        <el-select v-model="userSex" placeholder="请输入选择性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="searchBtn">搜索</el-button>
                        <el-button @click="reSetBtn">重置</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

// 定义数据
let userNumber = ref('')
let userName = ref('')
let userSex = ref('')
let tableData: any = inject('tableData')
let showData: any = inject('showData')
// 搜索按钮
function searchBtn() {
    showData.value = tableData.value.filter((item: any) => {
        if (item.userNumber.includes(userNumber.value) && item.userName.includes(userName.value) && item.userSex.includes(userSex.value)) {
            return item;
        }
    })
}
// 搜索模块重置按钮
function reSetBtn() {
    userNumber.value = ''
    userName.value = ''
    userSex.value = ''
    showData.value = [...tableData.value]
}
</script>

<style scoped lang="scss">
.search_box {
    .el-col {
        display: flex;
        align-items: center;

        span {
            width: 120px;
            text-align: right;
            margin-right: 10px;
            text-wrap: nowrap;
        }
    }
}
</style>