/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-25 17:26:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-25 17:35:39
 * @FilePath: \VueJS\src\feedback\SLoading.ts
 */

import {message} from 'ant-design-vue'

export class SLoading{

    static create() {
        
    }

    static show() {
        message.open({
            duration: 0,
            content: '加载中...',
        })
    }

    static destory() {
        message.destroy()
    }
}