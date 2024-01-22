import { defineStore } from 'pinia'
import { BgType } from '@/enum'
import AppConfig from './appConfig'
import { MusicEntity } from '@/entity/MusicEntity'

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

function getLastMusicObjFromStorage(): any {
    const entity = new MusicEntity()
    if(localStorage.getItem('lastMusicObj')) {
        const last = JSON.parse(localStorage.getItem('lastMusicObj') as any)
        return entity.setUrl(last.url).setCoverUrl(last.coverUrl).setId(last.id).setDuration(last.dt).setName(last.name)
    }else{
        return null
    }
}

export const appStore = defineStore('app' ,{
    state: () => ({
        bgType: localStorage.getItem('bgType') || BgType.SYSTEM,
        theme: localStorage.getItem('theme') || 'light',
        bgUrl: localStorage.getItem('bgUrl') || new URL(`@/assets/img/wallPaper/1.png`, import.meta.url).href,
        lastBgUrl: localStorage.getItem('lastBgUrl') || new URL(`@/assets/img/wallPaper/1.png`, import.meta.url).href,
        appPool: getAppPoolFromStorage(),
        lastOpenAppId: 0,
        lastMusicObj: getLastMusicObjFromStorage() || new MusicEntity()
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
            this.appPool = this.appPool.filter(item => item.id !== card.id) as any
            localStorage.setItem('appPool', JSON.stringify(this.appPool))
        },
        setLastOpenAppId(id: number) {
            this.lastOpenAppId = id
        },
        setMusicObj(obj: MusicEntity) {
            this.lastMusicObj = obj
            localStorage.setItem('lastMusicObj', JSON.stringify(obj))
        }
    }
})