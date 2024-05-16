<template>
    <div>
        <h2 class="title">
            游客留言板
        </h2>
        <div class="message_box">
            <div class="ipt">
                <el-input v-model="writer" maxlength="10" placeholder="请输入您的留言名称" show-word-limit type="text" />
                <el-input v-model="textarea" :autosize="{ minRows: 2, maxRows: 2 }" type="textarea"
                    placeholder="请输入您的留言" />
            </div>
            <div class="btn">
                <el-button type="success" size="large" @click="submitBtn">发布</el-button>
            </div>
        </div>
        <el-card>
            <div class="content_box">
                <div class="message_text">
                    <div class="writer_name">作者大大</div>
                    <div class="text">
                        由于个人后端技术的水平有限并且本次的项目仅为练习所以此项目没有连接数据库，为了解决之前遗留下来的品牌管理页面图片刷新丢失问题（具体请看ReadME文档中的品牌管理），
                        导致后端服务器重启一次，之前的数据全部丢失，但这并不影响之后的朋友们继续进行测试， 如果有什么要补充的内容或者问题以及bug可以联系我，有时间都会补充或者解释，
                        代码可以自行下载去更改或者增加内容（源码地址请看首页链接）。
                    </div>
                </div>
                <div class="message_text" v-for="(item, index) in  messageData" :key="index">
                    <div class="writer_name">{{ item.writer }}</div>
                    <div class="text">
                        {{ item.textarea }}
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
import { reqGetMessage, reqaddMessage } from '@/request/api'



let writer = ref('')  // 名称
let textarea = ref('')  // 留言
let messageData = ref([] as any[]) // 留言板数据
// 发布按钮
async function submitBtn() {
    if (!writer.value.trim()) {
        ElMessage({
            type: 'warning',
            message: '名称不能为空',
            grouping: true
        })
        return
    }
    if (!textarea.value.trim()) {
        ElMessage({
            type: 'warning',
            message: '留言不能为空',
            grouping: true
        })
        return
    }
    let data = {
        writer: writer.value,
        textarea: textarea.value
    }
    const result = await reqaddMessage(data)
    writer.value = ''
    textarea.value = ''
    if (!result) return
    const result2 = await reqGetMessage()
    if (!result2) return
    messageData.value = result2.data.messageData
}

onMounted(async function () {
    const result = await reqGetMessage()
    if (!result) return
    messageData.value = result.data.messageData
    messageData.value = result.data.messageData
})
</script>

<style scoped lang="scss">
.title {
    font-size: 30px;
    text-align: center;
}

:deep(.el-textarea__inner) {
    resize: none;
    font-size: 20px;
    margin: 10px 0;
}

.message_box {
    width: 100%;
    background-color: #6495ed;
    display: flex;
    align-items: center;
    padding: 40px;
    box-sizing: border-box;
    margin: 20px 0;
    justify-content: center;

    .ipt {
        width: 70%;
    }

    .btn {
        margin-left: 20px;

        .el-button--large {
            font-size: 18px
        }
    }
}

.content_box {
    width: 100%;
    height: 400px;
    overflow: auto;

    .message_text {
        margin-top: 20px;
        padding: 0 20px;
        box-sizing: border-box;

        .writer_name {
            color: #FB7299;
            margin-bottom: 10px;
            font-size: 20px;
        }

        .text {
            line-height: 30px;
            font-size: 18px;
            border-bottom: 1px solid #e3e5e7;
            padding-bottom: 20px;
            text-indent: 2em;
        }
    }
}

:deep(.el-pagination) {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
</style>