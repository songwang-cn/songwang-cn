import { App, createApp } from 'vue'
import Lock from '@/components/Lock.vue'
import ANTD from 'ant-design-vue'

export default function UseLockMask() {
    const div = document.createElement('div')
    div.style.position = 'fixed'
    div.style.inset = '0'
    div.style.background = 'rgba(0,0,0,0.5)'
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.justifyContent = 'space-around'
     
    let app: App | undefined

    app = createApp(Lock)

    app.use(ANTD)

    document.body.appendChild(div)

    app.mount(div)
}