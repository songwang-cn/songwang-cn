
import { SLoading } from '@/feedback/SLoading'
import { appStore } from '@/config/store'

export default async function UseChangeBg() {
    SLoading.show()
    const res = await fetch('https://api.wetab.link/api/wallpaper/next?type=random')
    const json = await res.json()
    preLoadImg(json.data.rawSrc)
  }
  
function preLoadImg(url: string) {
    const img = document.createElement('img')
    img.src = url
    img.onload = () => {
      appStore().setBgUrl(url)
      SLoading.destory()
    }
}