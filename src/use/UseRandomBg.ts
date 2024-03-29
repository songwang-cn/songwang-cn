
import { showToast } from 'vant'
import { appStore } from '@/config/store'
import { nextTick } from 'vue'
import { BgType } from '@/enum'

export async function UseRandomBg() {
    showToast({
      type: 'loading',
      message: '壁纸加载中',
      forbidClick: true,
      duration: 0,
    })
    const res = await fetch('https://api.wetab.link/api/wallpaper/next?type=random')
    const json = await res.json()
    const img = document.createElement('img')
    img.src = json.data.rawSrc
    return new Promise((resolve) => {
      img.onload = () => {
        appStore().setBgUrl(json.data.rawSrc)
        appStore().changeBgType(BgType.RANDOM)
        resolve(json.data.rawSrc)
        showToast().close()
        nextTick(() => {
          showToast({
            message: '壁纸加载成功', 
            type: 'success'
          })
        })
      }
    })
   
}