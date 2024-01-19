import { defineStore } from 'pinia'
import { BgType } from '@/enum'
import AppConfig from './appConfig'

function getAppPoolFromStorage(): [any] {
    const data = JSON.parse(localStorage.getItem('appPool') as any) || []
    const storageAppIdList = data.map(v => v.id)
    const list = [] as any
    AppConfig.allAppList.map((app) => {
        if(storageAppIdList?.includes(app.id)) {
            list.push(app)
        }
    })
    return list
}

export const appStore = defineStore('app' ,{
    state: () => ({
        bgType: localStorage.getItem('bgType') || BgType.SYSTEM,
        theme: localStorage.getItem('theme') || 'light',
        bgUrl: localStorage.getItem('bgUrl') || new URL(`@/assets/img/wallPaper/1.png`, import.meta.url).href,
        lastBgUrl: localStorage.getItem('lastBgUrl') || new URL(`@/assets/img/wallPaper/1.png`, import.meta.url).href,
        appPool: getAppPoolFromStorage(),
        lastOpenAppId: 0
    }),
    actions: {
        changeBgType(type: BgType){
            this.bgType = type
            localStorage.setItem('bgType', this.bgType)
        },
        changeTheme(){
            this.theme = this.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', this.theme)
        },
        setBgUrl(url: string){
            this.bgUrl = url
            localStorage.setItem('bgUrl', this.bgUrl)
            if(this.bgType === 'system') {
                this.setLastBgUrl(this.bgUrl)
            }
        },
        setLastBgUrl(url: string){
            this.lastBgUrl = url
            localStorage.setItem('lastBgUrl', this.lastBgUrl)
        },
        addAppInPool(card: any) {
            if(!this.appPool.some(item => item.id === card.id)) {
                this.appPool.push(card)
                this.lastOpenAppId = card.id
            }
            localStorage.setItem('appPool', JSON.stringify(this.appPool))
        },
        removeAppInPool(card: any) {
            this.appPool = this.appPool.filter(item => item.id !== card.id)
            localStorage.setItem('appPool', JSON.stringify(this.appPool))
        },
        setLastOpenAppId(id: number) {
            this.lastOpenAppId = id
        }
    }
})