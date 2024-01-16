import { ref, computed } from 'vue'

export function useMessageCenter() {

    const distance = 40 //拖动阈值

    const windowMargin = computed(() => window.innerWidth > 500 ? 12 : 0)

    const isDrag = ref(false)
    
    const messageCenterHeight = ref(0)
    
    function onMouseDown(e: MouseEvent) {
      if(!messageCenterHeight.value && e.y - windowMargin.value < distance){
        isDrag.value = true
      }
      if(messageCenterHeight.value && e.y > window.innerHeight - windowMargin.value*2 - distance) {
        isDrag.value = true
      }
    }
    function onMouseMove(e: MouseEvent) {
      if(isDrag.value) {
        messageCenterHeight.value = e.y - windowMargin.value
      }
    }

    function onTouchStart(e: TouchEvent) {
        if(!messageCenterHeight.value && e.touches[0].clientY - windowMargin.value < distance){
            isDrag.value = true
        }
        if(messageCenterHeight.value && e.touches[0].clientY > window.innerHeight - windowMargin.value*2 - distance) {
            isDrag.value = true
        }
    }

    function onTouchMove(e: TouchEvent) {
        if(isDrag.value) {
            messageCenterHeight.value = e.touches[0].clientY - windowMargin.value
          }
    }

    function onDragEnd() {
        if(!isDrag.value) return
        isDrag.value = false
        if(messageCenterHeight.value >= window.innerHeight/2 - windowMargin.value ) {
            messageCenterHeight.value = window.innerHeight - windowMargin.value*2
        }else{
            messageCenterHeight.value = 0
        }
    }

    return{
        isDrag,
        messageCenterHeight,
        onMouseDown,
        onMouseMove,
        onTouchStart,
        onTouchMove,
        onDragEnd
    }
}