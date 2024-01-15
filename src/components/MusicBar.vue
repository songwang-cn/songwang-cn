<template>
  <div 
    :class="['music', isClosing && 'closing', isOpen && 'open']" 
    @mousedown="onMouseDown" 
    @mousemove="onMouseMove" 
    @mouseup="onMouseUp"
    @mouseout="onMouseOut"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    :style="{
        width: (isOpen ? bubSize*1.5 : bubSize) + 'px',
        height: bubSize + 'px',
        top: y + 'px',
        left: x + 'px'
    }"
  >
    <div class="music-list" v-if="isOpen">
        blablabla
    </div>
    <SvgIcon 
        v-else 
        icon="icon-wangyiyunyinle"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import AppTable from "./AppTable.vue";
import { DialogHelper } from "@/helper/DialogHelper";
import Random from '@/views/random/index.vue';
import SvgIcon from "./SvgIcon.vue";

const windowMargin = ref(window.innerWidth > 500 ? 12 : 0)

//纵向吸附阈值
const adsorPintDistanceY = ref(20)

const appList = ref([
    {
        name: '微信',
        icon: 'icon-weixin1',
        action: () => alert('微信')
    },
    {
        name: 'Gitee',
        icon: 'icon-logo-gitee-g-red',
        action: () => window.open('https://gitee.com/song-wang', '_blank')
    },
    {
        name: '点名',
        isSvg: false,
        action: () => DialogHelper.show(Random)
    }
])

const bubSize = ref(60)

const isDraging = ref(false)

const isOpen = ref(false)

const x = ref(0)

const lastX = ref(x.value)

const y = ref(window.innerHeight / 2 - bubSize.value / 2 - 200)

const lastY = ref(y.value)

const startTime = ref(0)


function onMouseDown(e: MouseEvent) {
    startTime.value = Date.now()
    isDraging.value = true
    isClosing.value = false
}

function onMouseMove(e: MouseEvent) {
    if(isDraging.value && !isOpen.value){
        x.value = e.clientX-bubSize.value/2 
        y.value = e.clientY-bubSize.value/2 
    } 
}

function onMouseOut() {
    if(!isOpen.value){
        onMouseUp()
    }
}

function onMouseUp() {
    console.log('onMouseUp')
    console.log('isOpen', isOpen.value)
    console.log('time', Date.now() - startTime.value)
    isDraging.value = false
    isClosing.value = true
    
    if(isOpen.value) return

    onAdsorption()   

    if(Date.now() - startTime.value < 200 && !isOpen.value) {
        console.log('open')
        onBubOpen()
    }
}


console.log(window.innerHeight - windowMargin.value*2 - bubSize.value - adsorPintDistanceY.value)

//吸附
function onAdsorption() {
    if(x.value > (window.innerWidth - windowMargin.value*2) / 2 - bubSize.value / 2) {
        x.value = window.innerWidth - windowMargin.value*2 - bubSize.value
    }else{
        x.value = 0
    }

    if(y.value > window.innerHeight - windowMargin.value*2 - bubSize.value - adsorPintDistanceY.value) {
        y.value = window.innerHeight - windowMargin.value*2 - bubSize.value
    }
    if(y.value < adsorPintDistanceY.value ){
        y.value = 0
    }
}

function onTouchStart(e: TouchEvent){
    isClosing.value = false
    isDraging.value = true
}

function onTouchMove(e: TouchEvent){
    console.log(window)
    if(isDraging.value && !isOpen.value){
        x.value = e.touches[0].clientX-bubSize.value/2 < 0 ? 0 : e.touches[0].clientX-bubSize.value/2 > window.innerWidth - bubSize.value ? window.innerWidth - bubSize.value : e.touches[0].clientX-bubSize.value/2
        y.value = e.touches[0].clientY-bubSize.value/2 < 0 ? 0 : e.touches[0].clientY-bubSize.value/2 > window.innerHeight - bubSize.value ? window.innerHeight - bubSize.value : e.touches[0].clientY-bubSize.value/2
    }
}

const isClosing = ref(false)

function onTouchEnd(){
    isDraging.value = false
    isClosing.value = true
    //自动吸边
    if(isOpen.value) return

    onAdsorption()
}

onMounted(() => {
    window.onresize = () => {
        x.value = 0
        isOpen.value = false
        bubSize.value = 60
    }
    window.addEventListener('click', (e) => {
        console.log(e)
        if(isOpen.value && !e.target?.className.includes('music')){
            onBubClose()
        }
    })
})

function onBubOpen() {
    lastX.value = x.value
    lastY.value = y.value
    console.log('是点击')
    isOpen.value = true
    bubSize.value = (window.innerWidth - windowMargin.value*2) < 500 ? 350 : (window.innerWidth / 2 > 700 ? 700 : window.innerWidth / 2)
    x.value = window.innerWidth / 2 - (bubSize.value * 1.5) / 2
    y.value = window.innerHeight / 2 - bubSize.value  / 2
}

function onBubClose() {
    isDraging.value = false
    bubSize.value = 60
    x.value = lastX.value  
    y.value = lastY.value
    setTimeout(() => {
        isOpen.value = false
    }, 100)
}

</script>

<style lang="scss" scoped>
.music{
    user-select: none;
    position: absolute;
    z-index: 1000;
    border-radius: 20%;
    cursor: pointer;
    &.closing{
        transition: 300ms all ease-in-out;
    }
    &.open{
        border-radius: 60px;
        animation: fade-in 300ms ease-in-out;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(5px);
        overflow: auto;
        @keyframes fade-in {
            0%{
                opacity: 0.2;
            }
            100%{
                opacity: 1;
            }
        }
    }
}
</style>
