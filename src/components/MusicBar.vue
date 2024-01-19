<template>
    <FullScreenWrapper 
        :is-open="isOpen"
        @close="onBubClose"
    >
        <div 
            :class="['music', isClosing && 'inClosing', isOpen && 'is-open']" 
            @mousedown="onMouseDown" 
            @mouseup="onMouseUp"
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
            <div class="music-content">
                <div class="music-top">
                    <div  
                        :class="[
                            'music-pic', 
                            isPlaying && 'playing',
                            isOpen && 'is-open'
                        ]" 
                    >
                        <van-image :class="isPlaying ? 'playing' : 'pause'" class="music_img" :src="Jay" width="65%" height="65%" />
                        <div class="mask"/>
                    </div>
                </div>
                <div class="ctl" v-if="isOpen">
                    <i class="music-ctrl iconfont icon-shixin-shangyishou" @click="onPre"/>
                    <i :class="['music-ctrl iconfont', isPlaying ? 'icon-zanting' : 'icon-zantingbofang']" @click="onPlay"/>
                    <i class="music-ctrl iconfont icon-shixin-shangyishou" @click="onNext" style="transform: rotate(180deg);"/>
                </div>
            </div>
        </div> 
    </FullScreenWrapper>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { DialogHelper } from "@/helper/DialogHelper";
import Random from '@/views/random/index.vue';
import Jay from "@/assets/img/Jay.png";
import FullScreenWrapper from "./FullScreenWrapper.vue";

const windowMargin = ref(0)

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

onMounted(() => {
    document.body.addEventListener('mousemove', onMouseMove)
})


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
   /*  window.addEventListener('click', (e) => {
        console.log('click', e)
        if(isOpen.value && !e.target?.className.includes('music')){
            onBubClose()
        }
    }) */
})

function onBubOpen() {
    lastX.value = x.value
    lastY.value = y.value
    console.log('是点击')
    isOpen.value = true
    bubSize.value = (window.innerWidth - windowMargin.value*2) < 500 ? 350 : (window.innerWidth / 2 > 700 ? 700 : window.innerWidth / 2)
    x.value = (window.innerWidth - bubSize.value) / 2
    y.value = (window.innerHeight - bubSize.value)  / 2
}

function onBubClose() {
    isDraging.value = false
    bubSize.value = 60
    x.value = lastX.value  
    y.value = lastY.value
        isOpen.value = false
}

const isPlaying = ref(false)

function onPlay() {
    isPlaying.value = !isPlaying.value
}

function onPre() {
    isPlaying.value = false
}

function onNext() {
    isPlaying.value = false
}

</script>

<style lang="scss" scoped>

.music{
    user-select: none;
    position: absolute;
    border-radius: 10%;
    cursor: pointer;
    &.inClosing{
        transition: 500ms all ease-in-out;
    }
    &.is-open{
        background: #ea3e3c;
    }

    .music-content{
        height: 100%;
        position: relative;
        .music-top{
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
           
            .music-pic{
                width: 100%;
                height: 100%;
                background: url('@/assets/img/music-bg.png');
                background-size: 100% 100%;
                position: relative;
                border-radius: 100%;
                box-shadow: 0 0 20px rgba(0,0,0,.8);
                transition: 400ms all ease-in-out;
                &::after{
                    content: '';
                    position: absolute;
                    inset: 0;
                    margin: -5% auto;
                    width: 5%;
                    height: 50%;
                    opacity: 0;
                    border-radius: 20px;
                    background: #f1f1f1;
                    transform-origin: 50% 0%;
                    transition: 500ms;
                    transform: rotate(-90deg);
                }

                &.is-open{
                    margin: 10% auto;
                    width: 60%;
                    height: 60%;
                }

                &.playing{
                    &::after{
                        opacity: 1;
                        transform: rotate(-50deg);
                    }
                }
                .music_img{   
                    overflow: hidden;
                    border-radius: 100%; 
                    animation: ring infinite 10s linear;
                    position: absolute;
                    inset: 0;
                    margin: auto;
                    animation-delay: 600ms;
                    &::after{
                        content: '';
                        inset: 0;
                        width: 20%;
                        height: 20%;
                        margin: auto;
                        position: absolute;
                        border-radius: 100%;
                        background: #000000;
                        box-shadow: 0 0 20px #acacac;
                    }
                    &.playing{
                        box-shadow: 0 0 20px #929292;
                        animation-play-state: running;
                    }
                    &.pause{
                        box-shadow: none;
                        animation-play-state: paused;
                    } 
                }

                .mask{
                    position: absolute;
                    inset: 0;
                }

                @keyframes ring {
                    0%{
                        transform: rotate(0deg);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }
            }
        }
        .ctl{
            position: absolute;
            bottom: 8%;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            .iconfont{
                font-size: 30px;
                color: #fff;
            }
        }
    }
}
</style>
