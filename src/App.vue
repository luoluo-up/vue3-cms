<template>
  <div style="overflow-y: hidden">
    <el-config-provider :locale="locale">
      <router-view> </router-view>
    </el-config-provider>
  </div>

</template>

<script setup lang="ts" name="App">
import zhCn from "element-plus/es/locale/lang/zh-cn";

const locale = zhCn


</script>

<style scoped></style>