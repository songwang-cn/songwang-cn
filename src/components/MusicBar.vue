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
                top: y - (searchPanelIsOpen && !isPc ? searchPanelWidth/2: 0) + 'px',
                left: x - (searchPanelIsOpen && isPc ? searchPanelWidth/2 : 0) + 'px',
                borderRadius: searchPanelIsOpen ?( isPc ? '30px 0 0 30px' : '30px 30px 0 0') : '30px'
            }"
        >
            <div class="music-content">
                <div @click="openSearchPanel" :style="{
                    transform: `rotate(${searchPanelIsOpen ? 180 : 0}deg)`
                }" v-if="isOpen" class="section-bar iconfont icon-caidanzhankai" />
                <div class="music-top">
                    <div  
                        :class="[
                            'music-pic', 
                            isPlaying && 'playing',
                            isOpen && 'is-open'
                        ]" 
                    >
                        <van-image :class="isPlaying ? 'playing' : 'pause'" class="music_img" :src="MusicObj.coverUrl" width="65%" height="65%" />
                        <div class="mask"/>
                    </div>
                </div>
                <div class="ctl" v-if="isOpen">
                    <div class="song-name">{{ MusicObj.name }}</div>
                    <div class="progress">
                        <van-slider v-model="progress" @change="onProgressChange">
                        </van-slider>
                        <div class="time-left">
                            {{ getMusicTimeString(musicAudio.getDuration()) }}
                        </div> 
                        <div class="time-right">
                            {{ getMusicTimeString(MusicObj.dt / 1000) }}
                        </div>
                    </div>
                    <div class="act">
                        <i class="music-ctrl iconfont icon-shixin-shangyishou" @click="onPre"/>
                        <i :class="['music-ctrl iconfont', isPlaying ? 'icon-zanting' : 'icon-zantingbofang']" @click="onPlay"/>
                        <i class="music-ctrl iconfont icon-shixin-shangyishou" @click="onNext" style="transform: rotate(180deg);"/>
                    </div>
                </div>
            </div>
            <div v-if="searchPanelIsOpen" class="search-panel" :style="{
                width: searchPanelWidth + 'px',
                right: isPc ? -searchPanelWidth + 2 + 'px' : 0,
                top: !isPc ? searchPanelWidth - 2 +'px' : 0,
                borderRadius: isPc ? '0 30px 30px 0' : ' 0 0 30px 30px'
            }"
            >
                <div class="content">   
                    <van-search 
                        placeholder="输入关键词搜索歌曲" 
                        style="padding: 0;" 
                        v-model="keyword" 
                        @search="onSearch"
                    />
                    <div v-if="songList.length" class="song-list">
                        <div v-for="song of songList" class="item" @click="playSong(song)">
                            <div class="left">
                                <div class="name">{{ song.name }}</div>
                            </div>
                            <div class="singer">
                                {{ song.artists.map((v: any) => v.name).join(',') }}
                            </div>
                        </div>
                    </div>
                    <van-empty v-else style="flex: 1;" description="空空如也"/>
                    <van-pagination 
                        v-if="songList.length" 
                        v-model="currentPage"
                        :total-items="totalCount" 
                        @change="onPageChange"
                    />
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
import MusicPanel from '@/views/music/index.vue';
import { MusicAudio } from "@/musicAudio/index";
import { computed } from "vue";
import { UseIsPc } from "@/use/UseIsPc";
import { MusicEntity } from '@/entity/MusicEntity'
import { appStore } from "@/config/store"
import { showToast } from "vant";

const { isPc } = UseIsPc()

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

const searchPanelWidth = computed(() => bubSize.value > 400 ? 400 : bubSize.value)

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
        onBubClose()
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
    searchPanelIsOpen.value = false
}

const searchPanelIsOpen = ref(false)

const keyword = ref('')

function openSearchPanel() {
    searchPanelIsOpen.value = !searchPanelIsOpen.value
}

const songList = ref([] as any[])

const currentPage = ref(1)

const totalCount = ref(0)

async function onSearch() {
    showToast({
        type: 'loading',
        message: '加载中...',
        duration: 2
    })
    const res = await fetch(`https://v2.alapi.cn/api/music/search?keyword=${keyword.value}&page=${currentPage.value}&token=sumBlLtuZ4h4r7DO`)
    const { data } = await res.json()
    songList.value = data.songs
    totalCount.value = data.songCount
}

function onPageChange(page: number) {
    currentPage.value = page
    onSearch()
}

const isPlaying = ref(false)

const progress = ref(0)

const MusicObj = ref(appStore().lastMusicObj)

const musicAudio = new MusicAudio().setUrl(MusicObj.value.url)

function onProgressChange(num: number) {
    clearPlayTimer()
    musicAudio.setCurrentTime(num / 100 * MusicObj.value.dt / 1000)
    initPlayTimer()
}

function onPlay() {
    isPlaying.value = !isPlaying.value
    if(isPlaying.value) {
        musicAudio.play()
    }else{
        musicAudio.pause()
    }
}

function onPre() {
    isPlaying.value = false
}

function onNext() {
    isPlaying.value = false
}

async function getSongDetail(song: any) {
    const res = await fetch(`https://v2.alapi.cn/api/music/detail?id=${song.id}&token=sumBlLtuZ4h4r7DO`)
    const { data } = await res.json()
    /**
     * 设置音乐信息
     * @param name
     * @param coverUrl
     * @param duration
     */
    MusicObj.value
    .setName(data.songs[0].name)
    .setCoverUrl(data.songs[0].al.picUrl)
    .setDuration(data.songs[0].dt)
}

async function playSong(song: any) {
    await getSongDetail(song)
    const playUrl = `https://v2.alapi.cn/api/music/url?id=${song.id}&token=sumBlLtuZ4h4r7DO`
     /**
     * 设置音乐信息
     * @param id
     * @param url
     */
    MusicObj.value
    .setId(song.id)
    .setUrl(playUrl)

    musicAudio.setUrl(playUrl).play()
    appStore().setMusicObj(MusicObj.value)
    isPlaying.value = true
    initPlayTimer()
}

const playTimer = ref(null as any)

function initPlayTimer() {
    clearPlayTimer()
    playTimer.value = setInterval(() => {
        console.log(musicAudio.getDuration(), MusicObj.value.dt)
        progress.value = musicAudio.getDuration()*1000 / MusicObj.value.dt * 100
        console.log(progress.value)
    }, 1000)
}

function clearPlayTimer() {
    clearInterval(playTimer.value)
    playTimer.value = null
}

function getMusicTimeString(seconds: number) {
    return `${Math.floor(seconds / 60)}:${fillString(Math.ceil(seconds % 60))}`
}

function fillString(num: number) {
    return num > 10 ? num : '0'+num
}

</script>

<style lang="scss" scoped>

.music{
    user-select: none;
    position: absolute;
    cursor: pointer;
    display: flex;
    &.inClosing{
        transition: 500ms all ease-in-out;
    }
    &.is-open{
        background: #ea3e3c;
    }

    .music-content{
        height: 100%;
        position: relative;
        flex: 1;

        .section-bar{
            transition: 500ms;
            position: absolute;
            right: 25px;
            top: 25px;
            font-size: 30px;
            color: #fff;
            z-index: 999;
        }
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
                    animation: ring infinite 30s linear;
                    position: absolute;
                    inset: 0;
                    margin: auto;
                    animation-delay: 600ms;
                  /*   &::after{
                        content: '';
                        inset: 0;
                        width: 10%;
                        height: 10%;
                        margin: auto;
                        position: absolute;
                        border-radius: 100%;
                        background: #000000;
                        box-shadow: 0 0 20px #acacac;
                    } */
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
            bottom: 6%;
            width: 60%;
            left: 0;
            right: 0;
            margin: 0 auto;
            .song-name{
                width: 100%;
                text-align: center;
                font-size: 14px;
                color: #fff;
            }
            .progress{
                width: 100%;
                padding: 16px 0;
                position: relative;
                .time-left{
                    line-height: 30px;
                    position: absolute;
                    left: -40px;
                    top: calc(50% - 15px);
                    color: #fff;
                    font-size: 12px;
                }
                .time-right{
                    line-height: 30px;
                    position: absolute;
                    right: -40px;
                    top: calc(50% - 15px);
                    color: #fff;
                    font-size: 12px;
                }
            }
            .act{
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .iconfont{
                font-size: 24px;
                color: #fff;
            }
        }
    }

    .search-panel{
        position: absolute;
        background-color: #ea3e3c;
        height: 100%;
        border-radius: 0 30px 30px 0;
        display: flex;
            animation: fade-in 500ms ease-in-out;

        @keyframes fade-in {
            0%{
                opacity: 0;
                transform: translateX(-100px);
            }
            100%{
                opacity: 1;
                transform: translateX(0px);
            }
        }

        .content{
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            :deep(.van-empty__description){
                color: #eee;
            }
        }
        .song-list{
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            .item{
                font-size: 14px;
                padding:10px 5px;
                margin-bottom: 5px;
                color: #fff;
                border-bottom: 1px solid #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: 200ms;
                .left{
                    display: flex;
                    align-items: center;
                    .name{
                        padding-left: 10px;
                    }
                }
                &:hover{
                    color: #ea3e3c;
                    border-radius: 5px;
                    background-color: #fff;
                }
            }
        }
    }
}
</style>
