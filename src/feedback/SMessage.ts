/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-25 16:18:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-25 17:34:27
 * @FilePath: \VueJS\src\feedback\SMessage.ts
 */
import { SMessageType } from '@/enum/SMessageType';
import {message} from 'ant-design-vue';

export class SMessage {

    duration: number = 2

    top: string = `100px`

    maxCount: number = 3

    content: string = '消息内容'

    static create() {
        return new SMessage()
    }

    async success(content?: string) {
        return this.setContent(content).open(SMessageType.SUCCESS)
    }

    static async success(content: string) {
        return this.create().success(content)
    }

    async warning(content?: string) {
        return this.setContent(content).open(SMessageType.WARNING)
    }

    static async warning(content: string) {
        return this.create().warning(content)
    }

    async info(content?: string) {
        return this.setContent(content).open(SMessageType.INFO)
    }

    static async info(content: string) {
        this.create().info(content)
    }

    async error(content?: string) {
        return this.setContent(content).open(SMessageType.ERROR)
    }

    static async error(content: string) {
        return this.create().error(content)
    }

    setContent(content?: string) {
        if(content){
            this.content = content
        }
        return this
    }

    private async open(type: SMessageType) {
        return new Promise((resolve) => {
            message.open({
                duration: this.duration,
                type,
                content: this.content,
                onClose: () => {
                    resolve('close')
                }
            })
        })
    }
}