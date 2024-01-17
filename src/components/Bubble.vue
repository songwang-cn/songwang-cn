<template>
    <FullScreenWrapper 
        :is-open="isOpen" 
        @close="onClose"
    >
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
    </FullScreenWrapper>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import AppTable from "./AppTable.vue";
import { DialogHelper } from "@/helper/DialogHelper";
import Random from '@/views/random/index.vue';
import FullScreenWrapper from "./FullScreenWrapper.vue";

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

const y = ref(window.innerHeight / 2 - bubSize.value / 2)

const lastY = ref(y.value)

const startTime = ref(0)


function onMouseDown(e: MouseEvent) {
    startTime.value = Date.now()
    isDraging.value = true
    isEnding.value = false
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
    isEnding.value = true
    
    if(isOpen.value) return

    onAdsorption()   

    if(Date.now() - startTime.value < 200 && !isOpen.value) {
        console.log('open')
        onOpen()
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

    onAdsorption()
}

onMounted(() => {
    window.onresize = () => {
        x.value = 0
        isOpen.value = false
        bubSize.value = 60
    }
})

function onOpen() {
    lastX.value = x.value
    lastY.value = y.value
    isOpen.value = true
    console.log('是点击')
    bubSize.value = (window.innerWidth - windowMargin.value*2) < 500 ? 350 : (window.innerWidth / 2 > 700 ? 700 : window.innerWidth / 2)
    x.value = window.innerWidth / 2 - bubSize.value / 2
    y.value = window.innerHeight / 2 - bubSize.value  / 2
}

function onClose() {
    bubSize.value = 60
    x.value = lastX.value  
    y.value = lastY.value
    isOpen.value = false
    isDraging.value = false
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
        opacity: 1;
        transition: 300ms;
    }
    &::after{
        position: absolute;
        inset: 20%;
        content: '';
        width: 60%;
        height: 60%;
        background: rgba(226, 226, 226, 0.5);
        border-radius: 100%;
        opacity: 1;
        transition: 300ms;
    }
    &.ending{
        transition: 400ms all ease-in-out;
    }
    &.open{
        border-radius: 10%;
        animation: fade-in 300ms ease-in-out;
        background: #ccc;
        backdrop-filter: blur(5px);
        overflow: auto;
        z-index: 1001;
        &::after{
            opacity: 0;
        }
        &::before{
            opacity: 0;
        }

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
