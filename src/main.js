import { createApp } from 'vue'
import App from './App.vue'
import router from '@/config/router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/css/main.scss'
import './assets/iconfont/iconfont.js'
import AppConfig from '@/config/appConfig'
import { createPinia } from 'pinia'

AppConfig.router = router

createApp(App)
    .use(Antd, { size: 'small' })
    .use(router)
    .use(createPinia())
    .mount('#app')

