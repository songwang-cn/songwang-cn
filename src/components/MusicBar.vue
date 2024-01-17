<template>
    {{ isOpen }}
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
        width: bubSize + 'px',
        height: bubSize + 'px',
        top: y + 'px',
        left: x + 'px'
    }"
  >
    <div class="music-content" :style="{opacity: isOpen ? 1 : 0}">
        <div class="music-top">
            <div class="music-pic" :class="isPlaying && 'playingPic'">
                <van-image :class="isPlaying ? 'playing' : 'pause'" class="img" :src="Jay" width="65%" height="65%" />
            </div>
        </div>
        <div class="ctl">
         <i class="music-ctrl iconfont icon-shixin-shangyishou" @click="onPre"/>
         <i :class="['music-ctrl iconfont', isPlaying ? 'icon-zanting' : 'icon-zantingbofang']" @click="onPlay"/>
         <i class="music-ctrl iconfont icon-shixin-shangyishou" @click="onNext" style="transform: rotate(180deg);"/>
        </div>
    </div>
    <SvgIcon 







    
        v-if="!isOpen"
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
import Jay from "@/assets/img/Jay.png";

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
    x.value = (window.innerWidth - bubSize.value) / 2
    y.value = (window.innerHeight - bubSize.value)  / 2
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
    z-index: 1000;
    border-radius: 20%;
    cursor: pointer;
    &.closing{
        transition: 300ms all ease-in-out;
    }
    &.open{
        border-radius: 40px;
        animation: fade-in 300ms ease-in-out;
        background: #ea3e3c;
        backdrop-filter: blur(5px);
        overflow: auto;
        @keyframes fade-in {
            0%{
                opacity: 0;
            }
            100%{
                opacity: 1;
            }
        }
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
                width: 60%;
                height: 60%;
                margin: 10% auto;
                background: url('@/assets/img/music-bg.png');
                background-size: 100% 100%;
                position: relative;
                border-radius: 100%;
                box-shadow: 0 0 20px rgba(0,0,0,.8);
                &::after{
                    content: '';
                    position: absolute;
                    inset: 0;
                    margin: -10px auto;
                    width: 10px;
                    height: 50%;
                    opacity: 0;
                    border-radius: 20px;
                    background: #f1f1f1;
                    transform-origin: 50% 0%;
                    transition: 500ms;
                    transform: rotate(-90deg);
                }

                &.playingPic{
                    &::after{
                        opacity: 1;
                        transform: rotate(-50deg);
                    }
                }
                .img{   
                    overflow: hidden;
                    border-radius: 100%; 
                    animation: ring infinite 10s linear;
                    position: absolute;
                    inset: 0;
                    margin: auto;
                    animation-delay: 600ms;
                    &::after{
                        content: '';
                        border-radius: 20px;
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        background: #000000;
                        inset: 0;
                        margin: auto;
                        box-shadow: 0 0 20px #acacac;
                    }
                }

                .playing{
                    box-shadow: 0 0 20px #929292;
                    animation-play-state: running;
                }
                .pause{
                    box-shadow: none;
                    animation-play-state: paused;
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
            bottom: 10%;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            .iconfont{
                font-size: 22px;
                color: #fff;
            }
        }
    }
}
</style>
