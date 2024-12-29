v<template>
    <div>
        <div class="project_introduce">
            <p>
                项目路由结构：路由分为了常量路由，异步路由和任意路由，常量路由就是每个用户都需要可以使用的路由组件，异步路由即就是可以动态展示的路由，
                这是作为用户管理分配权限的时候使用的路由数据。任意路由当用户输入的地址错误时，会自动跳转到404路由提示用户地址路径错误。
            </p>
            <p>
                项目布局结构：整体的项目路由页面基本都在Layout页面中，只有 登录页面、404页面、数据可视化页面是处于layout外的页面。
            </p>
            <p>
                Layout页：分为左、上、右三个部分。分别为Aside，Header，Main，Aside为左边菜单栏，Header为顶部区域，Main为主体内容显示区域。
            </p>
            <p>
                Aside菜单的实现：通过Element组件库中的Menu组件实现，数据的展示根据对应用户的常量路由以及对应的路由权限数据所过滤的菜单展示。
            </p>
            <p>
                Header头部的实现：分为上下两个部分，上面的内容存放了菜单面包屑，以及用户的头像和数据以及一些项目的整体配置数据，如：主体颜色、暗黑配置、
                中英文切换、全屏等。下面的内容则是存放了所打开的内容 Tag 小标签，并且实现了路由跳转。
            </p>
            <p>
                Main的实现：显示对应路由的页面。
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
</style>