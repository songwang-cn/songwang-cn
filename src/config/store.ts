/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 16:05:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 15:48:09
 * @FilePath: \Vue3vite\src\config\store.ts
 */
import { defineStore } from 'pinia'
import { BgType, MenuType } from '@/enum'

export const appStore = defineStore('app' ,{
    state: () => ({
        menuType: MenuType.BUTTON,
        bgType: BgType.STATIC,
        bgUrl: 'https://infinitypro-img.infinitynewtab.com/wallpaper/ocean/11656.jpg' //https://infinitypro-img.infinitynewtab.com/wallpaper/athletics/658.jpg
    }),
    actions: {
        setMenuType(type: MenuType){
            this.menuType = type
        },
        setBgType(type: BgType){
            this.bgType = type
        },
        setBgUrl(url: string){
            this.bgUrl = url
        }
    }
})