import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
    
    {
        path: '/',
        name: 'Load',
        component: () => import('../views/load/index.vue'),
        meta: {
            title: '资源加载页',
            icon: 'icon-shouye-zhihui'
        },
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../components/Body.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router



