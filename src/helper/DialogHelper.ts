/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 17:41:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-27 10:16:48
 * @FilePath: \VueJS\src\helper\DialogHelper.ts
 */
import { App, Component, createApp } from "vue";
import ANTD from 'ant-design-vue'
/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 17:41:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-27 00:43:34
 * @FilePath: \VueJS\src\helper\DialogHelper.ts
 */
export class DialogHelper{

    static async create(component: Component, param?: Record<string, any>) {
        const node = document.createElement('div');
        node.setAttribute('id', `dialog_${Date.now()}`)
        
        let app: App<Element> | undefined

         // 卸载dom的方法
        const unmount = () => {
            if (app) {
                app.unmount()
                document.body.removeChild(node)
                app = undefined
            }
        }

        return new Promise((resolve, reject) => {
            if(app) {
                return
            }

            app = createApp(component, {
                param,
                onConfirm: async(res: any) => {
                    unmount()
                    resolve(res)
                },
                onClose:() => {
                    unmount()
                    reject()
                }
            })

            
            app.use(ANTD)

            document.body.appendChild(node)

            app.mount(node)
        })
    }


    static async show(component: Component, param?: Record<string, any>): Promise<any> {
       return this.create(component, param)
    }

}