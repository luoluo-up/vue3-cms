// 常量路由
export const constRoutes = [
    // 首页
    {
        path: '/',
        redirect: '/home',
        name: 'Layout',
        label: 'Layout',
        component: () => import('@/layout/Layout.vue'),
        meta: {
            title: '',
            icon: '',
            hidden: false
        },
        children: [
            {
                path: '/home',
                name: 'Home',
                label: '首页',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: 'menu.index.title',
                    icon: 'HomeFilled',
                    hidden: false
                },
            },
        ]
    },
    // 登录页
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        label: '登录',
        meta: {
            title: 'menu.login.title',
            icon: '图标',
            hidden: true
        },
    },
    // 404
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
        label: '404',
        meta: {
            title: 'menu.error.title',
            icon: '图标',
            hidden: true
        },
    },
    // 数据可视化
    {
        path: '/screen',
        name: 'Screen',
        component: () => import('@/views/screen/index.vue'),
        label: '数据可视化',
        meta: {
            title: 'menu.screen.title',
            icon: 'Histogram',
            hidden: false
        },
    },
]

// 异步路由
export const asyncRoutes = [
    // 商品管理
    {
        path: '/product',
        redirect: '/product/brand',
        name: 'Product',
        label: '商品管理',
        component: () => import('@/layout/Layout.vue'),
        meta: {
            title: 'menu.product.title',
            icon: 'ShoppingBag',
            hidden: false
        },
        children: [
            {
                path: '/product/brand',
                name: 'productBrand',
                component: () => import('@/views/product/brand/index.vue'),
                label: '品牌管理',
                meta: {
                    title: 'menu.product.brand',
                    icon: 'Shop',
                    hidden: false
                },
            },
            {
                path: '/product/spu',
                name: 'producSpu',
                label: 'SPU管理',
                component: () => import('@/views/product/spu/index.vue'),
                meta: {
                    title: 'menu.product.spu',
                    icon: 'Shop',
                    hidden: false
                },
            },
            {
                path: '/product/sku',
                name: 'producSku',
                label: 'SKU管理',
                component: () => import('@/views/product/sku/index.vue'),
                meta: {
                    title: 'menu.product.sku',
                    icon: 'Shop',
                    hidden: false
                },
            },
        ]
    },

    // 权限管理
    {
        path: '/acl',
        redirect: '/acl/user',
        name: 'Acl',
        label: '权限管理',
        component: () => import('@/layout/Layout.vue'),
        meta: {
            title: 'menu.acl.title',
            icon: 'Histogram',
            hidden: false
        },
        children: [
            {
                path: '/acl/user',
                name: 'aclUser',
                label: '用户管理',
                component: () => import('@/views/acl/user/index.vue'),
                meta: {
                    title: 'menu.acl.user',
                    icon: 'User',
                    hidden: false
                },
            },
            {
                path: '/acl/role',
                name: 'aclRole',
                label: '角色管理',
                component: () => import('@/views/acl/role/index.vue'),
                meta: {
                    title: 'menu.acl.role',
                    icon: 'UserFilled',
                    hidden: false
                },
            },
            {
                path: '/acl/menus',
                name: 'aclMenus',
                label: '菜单管理',
                component: () => import('@/views/acl/menus/index.vue'),
                meta: {
                    title: 'menu.acl.menu',
                    icon: 'List',
                    hidden: false
                },
            },
        ]
    },
]

// 任意路由
export const anyRoutes = [
    // 任意路由
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        label: '任意路由',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'DataLine'
        }
    },
]

