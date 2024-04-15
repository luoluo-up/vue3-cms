v<template>
    <div>
        <div class="project_introduce">
            <p>
                Vue是前端三大主流框架之一，也是目前最火的一个前端框架。Vue作为一套构建用户界面的框架，关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合，提高开发效率。
                在Vue中也有这样一个核心的概念，就是让用户不再操作DOM元素，解放了用户的双手，让程序员可以更多的时间去关注业务逻辑。
            </p>
            <p>
                随着Vue2的暂停维护，Vue3成为主流，故开发此项目的目的是为了巩固所学的Vue3基础知识，以便之后能熟练使用。我本想跟着bilibili中的硅谷甄选项目继续学习下去，但
                在测试的时候发现硅谷甄选项目的后台服务器接口部分已经崩溃，并且由于自己时间问题，所以此项目的页面结构模仿了硅谷甄选的界面，前后端开发由个人自行从0到1搭建，
                完成了项目的基本结构以及部分页面和交互，由于时间问题没有做更多的页面，但其实其它内容大同小异。
            </p>
            <p>
                由于本人主要学的是前端，对于NodeJS只是仅能搭建简单的服务器以及连接数据库的简单操作（此项目未连接数据库交互），对于其它后端技术并不太了解，故可能有一些操作（我还未发现的操作）会导致后端服务器报错崩溃，
                如果您在测试的过程中发现问题可以留言或者直接联系我，我发现后有时间就会修改（当然这只是我的一个练习，不一定都会修改）。
            </p>
            <p>
                项目使用到的技术：Vue3 + TS + vite + Element-Plus + router + pinia + NodeJS
            </p>
        </div>
        <div class="project_introduce">
            <p style="color: #ff1000;">
                此项目只是我的一个学习Vue3的练习项目，因为视频教程的接口崩溃，所以我根据页面做模板，自行从0-1开发的后台管理系统练习，并且由于时间问题没有做的很完善，肯定有
                很多需要完善的地方，但出于我练手的目的，没有再去更进一步的完善，如果有什么要补充的内容或者问题以及bug可以联系我，有时间都会补充或者解释，代码可以自行
                下载去更改或者增加内容，项目的基础结构基本结构是有的，只是可能有的地方需要完善。
            </p>
        </div>
        <div class="address">
            <p>
                前端源码地址：
                <a href="https://gitee.com/xiaodutongxue111/vue3_admin.git" target="_blank">
                    https://gitee.com/xiaodutongxue111/vue3_admin.git
                </a>
            </p>
            <p>
                服务器Node源码地址：
                <a href="https://gitee.com/xiaodutongxue111/vue3_admin_node-js.git" target="_blank">
                    https://gitee.com/xiaodutongxue111/vue3_admin_node-js.git
                </a>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.project_introduce {
    text-indent: 2em;
    line-height: 30px;
    font-weight: 700;
    font-size: 18px;

    p {
        margin: 10px 0;
    }
}

.address {
    text-indent: 2em;
    line-height: 24px;
    font-weight: 700;
    font-size: 18px;
    margin-top: 40px;

    p {
        margin: 10px 0;

        a {
            color: #409eff;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>