import { BaseEntity } from "./BaseEntity";
import DefaultCover from '@/assets/img/Jay.png'

export class MusicEntity extends BaseEntity{

    url?: string = DefaultCover

    coverUrl?: string

    dt!: number

    singer?: string

    setSinger(singer: string) {
        this.singer = singer
        return this
    }
    
    setUrl(url: string) {
        this.url = url
        return this
    }

    setCoverUrl(url: string) {
        this.coverUrl = url
        return this
    }

    setDuration(dt: number) {
        this.dt = dt
        return this
    }

}