import Clander from "@/components/Clander.vue";
import { createApp } from "vue";

export default function UseClander(e: MouseEvent, size: number) {
    const _size = size + 30
    if(document.getElementById('clander')){
        return
    } else {
        let div = document.createElement('div')
        div.setAttribute('id', 'clander')
        div.style.position = 'absolute'
        div.style.top  = e.clientY < 50 ? 50+'px' : e.clientY + _size > window.innerHeight ? window.innerHeight - _size + 'px' : e.clientY + 'px'
        div.style.left  = e.clientX + _size > window.innerWidth ? window.innerWidth - _size + 'px' : e.clientX + 'px'
        div.style.overflow = 'hidden'
    
        let app = createApp(Clander, {
            width: size,
            destory: () => {
                document.body.removeChild(div)
            }
        })
    
        document.body.appendChild(div)
    
        app.mount(div)
    }
}