/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 10:48:48
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-07 15:33:47
 * @FilePath: \Vue3vite\src\config\router.ts
 */
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



