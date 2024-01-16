import { defineStore } from 'pinia'

export const appStore = defineStore('app' ,{
    state: () => ({
        bgType: localStorage.getItem('bgType') || 'system',
        theme: localStorage.getItem('theme') || 'light',
        bgUrl: localStorage.getItem('bgUrl') || new URL(`@/assets/img/wallPaper/1.png`, import.meta.url).href,
        lastBgUrl: localStorage.getItem('lastBgUrl') || new URL(`@/assets/img/wallPaper/1.png`, import.meta.url).href,
    }),
    actions: {
        changeBgType(){
            this.bgType = this.bgType === 'system' ? 'random' : 'system'
            localStorage.setItem('bgType', this.bgType)
        },
        changeTheme(){
            this.theme = this.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', this.theme)
        },
        setBgUrl(url: string){
            this.setLastBgUrl(this.bgUrl)
            this.bgUrl = url
            localStorage.setItem('bgUrl', this.bgUrl)
        },
        setLastBgUrl(url: string){
            this.lastBgUrl = url
            localStorage.setItem('lastBgUrl', this.lastBgUrl)
        }
    }
})