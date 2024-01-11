/*
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-09-07 11:29:14
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-15 15:09:32
 * @FilePath: \Vue3vite\src\use\UseCountDown.ts
 */
export default function UseCountDown(count: number, background: string = 'rgba(0,0,0,0.5)') {
    return new Promise((resolve) => {
        let _count = count
        const div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.height = '300px'
        div.style.width = '300px'
        div.style.background = background
        div.style.borderRadius = '20px'
        div.style.inset = '0'
        div.style.margin = 'auto'
        div.style.display = 'flex'
        div.style.alignItems = 'center'
        div.style.justifyContent = 'space-around'
        div.style.fontSize = '50px'
        div.style.color = '#fff'
        div.style.zIndex = '999'
        div.style.textAlign = 'center'
        div.style.lineHeight = '500px'
        div.innerHTML = _count.toString()
        document.body.appendChild(div)
        let timer = setInterval(() => {
            _count--
            div.innerHTML = _count.toString()
            if(_count <= 0) {
                clearInterval(timer)
                document.body.removeChild(div)
                resolve(true)
            }
        }, 1000)
    })
   
}