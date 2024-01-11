/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-25 13:09:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-25 13:10:16
 * @FilePath: \VueJS\src\use\UseMousePosition.ts
 */
import {ref} from 'vue' 

export default function useMousePosition() {
    const x = ref(0)
    const y = ref(0)

    const updateMouse = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }

    window.addEventListener('mousemove', updateMouse)

    return {
        x,
        y
    }
}