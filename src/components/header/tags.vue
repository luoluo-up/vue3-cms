<template>
    <div class="tag_box">
        <el-card shadow="always">
            <el-tag v-for="(tag, index) in breadList" :key="tag.path" closable size="large"
                @close="handleClose(tag, index)" @click="changeTag(tag)"
                :effect="$useRoute.matched[$useRoute.matched.length - 1].path == tag.path ? 'dark' : 'plain'">
                {{ $t(`${tag.title}`) }}
            </el-tag>
        </el-card>
    </div>

</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import emitter from '@/utils/emitter';

// tags 面包屑数据
const $useRoute = useRoute()
let breadList = ref([
    {
        path: $useRoute.matched[$useRoute.matched.length - 1].path,
        title: $useRoute.matched[$useRoute.matched.length - 1].meta.title
    }
])
emitter.on('pushBread', (data: any) => {
    if (data.children) {
        let result = breadList.value.some((item, idx) => {
            if (item.path == data.children[0].path) {
                return true
            }
        })
        if (result) return
        breadList.value.push({
            path: data.children[0].path,
            title: data.children[0].meta.title
        })
    } else {
        let result = breadList.value.some((item, idx) => {
            if (item.path == data.path) {
                return true
            }
        })
        if (result) return
        breadList.value.push({
            path: data.path,
            title: data.meta.title
        })
    }
})
// 关闭某个tag
function handleClose(tag: any, index: number) {
    if (tag.path !== $useRoute.matched[$useRoute.matched.length - 1].path) {
        breadList.value.splice(index, 1)
    } else {
        if (breadList.value.length - 1 > index) {
            // 如果当前删除的标签后面还有标签就跳下一个标签
            $router.push(breadList.value[index + 1].path)
        } else if (breadList.value.length > 1) {
            // 如果当前删除的标签后面没有标签就跳上一个标签
            $router.push(breadList.value[index - 1].path)
        } else {
            // 如果当前删除的标签前后都没有标签，即跳回首页
            $router.push('/home')
            breadList.value.push(
                {
                    path: '/home',
                    title: 'menu.index.title'
                }
            )
        }
        breadList.value.splice(index, 1)
    }

}
const $router = useRouter()
function changeTag(tag: any) {
    $router.push(tag.path)
}
</script>

<style scoped lang="scss">
.tag_box {
    margin-top: 10px;

    .el-tag {
        margin-right: 10px;
        margin-bottom: 10px;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>