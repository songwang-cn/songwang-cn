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
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '首页',
            icon: 'icon-shouye-zhihui'
        }
    },
    {
        path: '/random',
        name: 'Random',
        component: () => import('../views/random/index.vue'),
        meta: {
            title: '随机',
            icon: 'icon-suijishushengcheng'
        }
    },
    {
        path: '/other',
        name: 'Other',
        component: () => import('../views/other/index.vue'),
        meta: {
            title: '其他',
            icon: 'icon-ceshigongju'
        }
    },
/*     {
        path: '/bio',
        name: 'Bio',
        component: () => import('../views/biographical/index.vue'),
        meta: {
            title: '简历',
            icon: 'icon-wodejianli'
        }
    }, */

    {
        path: '/note',
        name: 'Note',
        component: () => import('../views/note/index.vue'),
        meta: {
            title: '笔记',
            icon: 'icon-a-bijibenbiji'
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router



