import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
    
    {
        path: '/',
        name: 'Load',
        component: () => import('../views/load/index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue'),
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



