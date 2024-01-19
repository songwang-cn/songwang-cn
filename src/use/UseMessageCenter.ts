import { ref } from 'vue'

export function useMessageCenter() {

    const distance = 40 //拖动阈值

    const windowMargin = ref(0) // computed(() => window.innerWidth > 500 ? 12 : 0)

    const isDrag = ref(false)
    
    const bottom = ref(window.innerHeight)
    
    function onMouseDown(e: MouseEvent) {
      if(bottom.value == window.innerHeight && e.y - windowMargin.value < distance){
        isDrag.value = true
      }
      if(!bottom.value && e.y > window.innerHeight - windowMargin.value*2 - distance) {
        isDrag.value = true
      }
    }
    function onMouseMove(e: MouseEvent) {
      if(isDrag.value) {
        bottom.value = window.innerHeight - e.y - windowMargin.value
      }
    }

    function onTouchStart(e: TouchEvent) {
        if(bottom.value === window.innerHeight && e.touches[0].clientY - windowMargin.value < distance){
            isDrag.value = true
        }
        if(!bottom.value && e.touches[0].clientY > window.innerHeight - windowMargin.value*2 - distance) {
            isDrag.value = true
        }
    }

    function onTouchMove(e: TouchEvent) {
        if(isDrag.value) {
            bottom.value = window.innerHeight - e.touches[0].clientY - windowMargin.value
          }
    }

    function onDragEnd() {
        if(!isDrag.value) return
        isDrag.value = false
        if(bottom.value >= window.innerHeight/2 - windowMargin.value ) {
            bottom.value = window.innerHeight - windowMargin.value*2
        }else{
            bottom.value = 0
        }
    }

    return{
        isDrag,
        bottom,
        onMouseDown,
        onMouseMove,
        onTouchStart,
        onTouchMove,
        onDragEnd
    }
}