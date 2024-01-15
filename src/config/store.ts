import { defineStore } from 'pinia'

export const appStore = defineStore('app' ,{
    state: () => ({
        theme: localStorage.getItem('theme') || 'light',
        bgUrl: localStorage.getItem('bgUrl') || new URL(`@/assets/img/wallPaper/1.png`, import.meta.url).href
    }),
    actions: {
        changeTheme(){
            this.theme = this.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', this.theme)
        },
        setBgUrl(url: string){
            this.bgUrl = url
            localStorage.setItem('bgUrl', this.bgUrl)
        }
    }
})