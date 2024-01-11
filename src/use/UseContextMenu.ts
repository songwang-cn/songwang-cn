/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-28 00:25:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 16:15:14
 * @FilePath: \Vue3vite\src\use\UseContextMenu.ts
 */
import ContextMenuVue from "@/components/ContextMenu.vue";
import {App, createApp} from "vue";

export default function UseContextMenu(e: MouseEvent, menu?: any[]) {
    let node: any

    node = document.getElementById('context_menu')

    if(node) {
        document.body.removeChild(node)
    }

    node = document.createElement('div');

    node.setAttribute('id', `context_menu`)

    return new Promise((resolve) => {
        let app: App<Element> | undefined

        app = createApp(ContextMenuVue, {
            event: e,
            menu,
            onAction: (res: any) => {
                document.body.removeChild(node)
                resolve(res)
            },
            onClose:() => {
                document.body.removeChild(node)
            }
        })
    
        document.body.appendChild(node)
    
        app.mount(node)
    })
}