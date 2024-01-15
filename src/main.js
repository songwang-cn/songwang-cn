import { createApp } from 'vue'
import App from './App.vue'
import router from '@/config/router'
import './assets/css/main.scss'
import './assets/iconfont/iconfont.js'
import AppConfig from '@/config/appConfig'
import { createPinia } from 'pinia'
import Vant from 'vant';
import 'vant/lib/index.css';
import { ConfigProvider } from 'vant';

AppConfig.router = router

createApp(App)
    .use(Vant)
    .use(router)
    .use(ConfigProvider)
    .use(createPinia())
    .mount('#app')

