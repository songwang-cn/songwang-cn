<template>
  <div 
    :class="['bubble', isEnding && 'ending', isOpen && 'open']" 
    @mousedown="onMouseDown" 
    @mousemove="onMouseMove" 
    @mouseup="onMouseUp"
    @mouseout="onMouseOut"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    :style="{
        width: bubSize + 'px',
        height: bubSize + 'px',
        top: y + 'px',
        left: x + 'px'
    }"
  >
    <AppTable class="bubble-list" v-if="isOpen" :list="appList"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import {ref} from "vue"
import AppTable from "./AppTable.vue";
import { DialogHelper } from "@/helper/DialogHelper";
import Random from '@/views/random/index.vue';

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

const y = ref(window.innerHeight / 2 - bubSize.value / 2)

const startTime = ref(0)

function onMouseDown(e: MouseEvent) {
    startTime.value = Date.now()
    isDraging.value = true
    isEnding.value = false
}

function onMouseMove(e: MouseEvent) {
    if(isDraging.value && !isOpen.value){
        x.value = e.clientX-bubSize.value/2 < 0 ? 0 : e.clientX-bubSize.value/2 > window.innerWidth - 24 - bubSize.value ? window.innerWidth - 24 - bubSize.value : e.clientX-bubSize.value/2
        y.value = e.clientY-bubSize.value/2 < 0 ? 0 : e.clientY-bubSize.value/2 > window.innerHeight - 24 - bubSize.value ? window.innerHeight - 24 - bubSize.value : e.clientY-bubSize.value/2
    } 
}

function onMouseOut() {
    if(!isOpen.value){
        onMouseUp()
    }
}

function onMouseUp() {
    console.log('onMouseUp')
    isDraging.value = false
    isEnding.value = true
    
    if(isOpen.value) return

    if(x.value > (window.innerWidth - 24) / 2 - bubSize.value / 2) {
        x.value = window.innerWidth - 24 - bubSize.value
    }else{
        x.value = 0
    }    

    if(Date.now() - startTime.value < 100 && !isOpen.value) {
        console.log('open')
        onBubOpen()
    }

}

function onTouchStart(e: TouchEvent){
    isEnding.value = false
    isDraging.value = true
}

function onTouchMove(e: TouchEvent){
    console.log(window)
    if(isDraging.value && !isOpen.value){
        x.value = e.touches[0].clientX-bubSize.value/2 < 0 ? 0 : e.touches[0].clientX-bubSize.value/2 > window.innerWidth - bubSize.value ? window.innerWidth - bubSize.value : e.touches[0].clientX-bubSize.value/2
        y.value = e.touches[0].clientY-bubSize.value/2 < 0 ? 0 : e.touches[0].clientY-bubSize.value/2 > window.innerHeight - bubSize.value ? window.innerHeight - bubSize.value : e.touches[0].clientY-bubSize.value/2
    }
}

const isEnding = ref(false)

function onTouchEnd(){
    isDraging.value = false
    isEnding.value = true
    //自动吸边
    if(isOpen.value) return

    if(x.value > window.innerWidth / 2 - bubSize.value / 2) {
        x.value = window.innerWidth - bubSize.value
    }else{
        x.value = 0
    }
}

onMounted(() => {
    window.onresize = () => {
        x.value = 0
        isOpen.value = false
        bubSize.value = 60
    }
    window.addEventListener('click', (e) => {
        console.log(e)
        if(isOpen.value && !e.target?.className.includes('bubble')){
            onBubClose()
        }
    })
})

function onBubOpen() {
    console.log('是点击')
    isOpen.value = true
    bubSize.value = window.innerWidth < 700 ? 350 : window.innerWidth / 2
    x.value = window.innerWidth / 2 - bubSize.value / 2
    y.value = window.innerHeight / 2 - bubSize.value  / 2
}

function onBubClose() {
    isOpen.value = false
    bubSize.value = 60
    x.value = 0   
    y.value = window.innerHeight / 2 - bubSize.value  / 2
}

</script>

<style lang="scss" scoped>
.bubble{
    user-select: none;
    position: absolute;
    z-index: 1000;
    border-radius: 20%;
    cursor: pointer;
    background-color: rgba(110, 110, 110, 0.6);
    &::before{
        position: absolute;
        inset: 10%;
        content: '';
        width: 80%;
        height: 80%;
        background: rgba(173, 173, 173, 0.5);
        border-radius: 100%;
    }
    &::after{
        position: absolute;
        inset: 20%;
        content: '';
        width: 60%;
        height: 60%;
        background: rgba(226, 226, 226, 0.5);
        border-radius: 100%;
    }
    &.ending{
        transition: 200ms all ease-in-out;
    }
    &.open{
        border-radius: 10%;
        animation: fade-in 500ms ease-in-out;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(5px);
        &::after{
            display: none;
        }
        &::before{
            display: none;
        }

        @keyframes fade-in {
            0%{
                opacity: 0.1;
            }
            100%{
                opacity: 1;
            }
        }
    }
}
</style>
