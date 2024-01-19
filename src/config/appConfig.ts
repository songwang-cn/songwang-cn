import { Router } from 'vue-router'
import { AllAppList, FooterAppList } from './appListConfig'
export default class AppConfig {
    /**
     * 😀 路由
     */
    static router: Router

    /**
     * 🤩 应用列表
     */
    static allAppList = AllAppList
    
    /**
     * 🤩 底部应用列表
     */
    static footerAppList = FooterAppList
}