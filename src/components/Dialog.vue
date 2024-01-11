
<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 17:58:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 14:43:32
 * @FilePath: \Vue3vite\src\components\Dialog.vue
-->
<template>      
    <div 
        class="dialog"
        :class="getBgClass"
        @click.self="bgClick"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
    >  
        <div 
            ref="main"
            class="main" 
            :class="getMainClass"
            :style="{
                width, 
                height,
                left: posX+'px',
                top: posY+'px',
                transition: isDraging ? 'none' : '300ms'
            }"
        >
            <div 
                class="top" 
                @mousedown="onMouseDown"
                @dblclick="onFullScreen"
                :style="{
                    cursor: isDraging && !isFullScreen ? 'grabbing' : 'grab'
                }"
            >
                <div class="title" v-if="!hideTitle">{{ title }}</div>
                <div class="ctrl">
                    <i :class="['action', 'iconfont', `${isFullScreen ? 'icon-quxiaoquanping' : 'icon-quanping'}_o`]"  @click.self="onFullScreen"/>
                    <i @click.self="onClose()" class="action iconfont icon-guanbi" />
                </div>
            </div>
            <div class="body">
                <slot>
                    内容
                </slot>
            </div>
            <div class="footer" v-if="!hideCtrl">
                <slot name="footer">
                    <slot name="footer-left"/>
                    <a-button @click="onClose" v-if="!hideCancel">取消</a-button>
                    <slot name="footer-center"/>
                    <a-button type="primary" v-if="!hideConfirm">确定</a-button>
                    <slot name="footer-right"/>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted} from "vue"

const props = defineProps({
    title: {
        type: String,
        default: '弹窗标题'
    },
    width:{
        type: String,
        default: '70%'
    },
    height: {
        type: String,
        default: '50%'
    },
    hideCtrl: {
        type: Boolean,
        default: false
    },
    hideCancel: {
        type: Boolean,
        default: false
    },
    hideConfirm: {
        type: Boolean,
        default: false
    },
    onConfirm:{
        type: Function,
        default: () => {}
    },
    onClose:{
        type: Function,
        default: () => {}
    }

})

const main = ref()

const isDraging = ref(false)

const posX = ref(window.innerWidth / 4)

const posY = ref(window.innerHeight)

onMounted(() => {
    posX.value = window.innerWidth / 2 - main.value?.offsetWidth / 2
    posY.value = window.innerHeight / 2 - main.value?.offsetHeight / 2
})

const isShaking = ref(false)

const isFullScreen = ref(false)

/**
 * 四周吸附效果的临界值，小于这个值就吸附
 */
const maxCriticalValue = ref(10)

function bgClick() {
    isShaking.value = true
    setTimeout(() => {
        isShaking.value = false
    }, 400)
}

const getBgClass = computed(() => {
    return isShaking.value ? ['shake'] : []
})

const getMainClass = computed(() => {
    return isFullScreen.value ? ['full-screen'] : []
})

function onFullScreen() {
    isFullScreen.value = !isFullScreen.value
}


/**
 * 记录下点击时鼠标在拖动元素内部的偏移量
 */
const offsetX = ref(0)

const offsetY = ref(0)

function onMouseDown(e: MouseEvent) {
    if(!isFullScreen.value && e.target?.className === 'top') {
        offsetX.value = e.offsetX
        offsetY.value = e.offsetY
        isDraging.value = true
    }
}

function onMouseUp(e: MouseEvent){
    isDraging.value = false
}

function onMouseMove(e: MouseEvent) {
    if(isDraging.value) {
        posX.value = e.x - offsetX.value
        posY.value = e.y - offsetY.value
        if(posX.value <= maxCriticalValue.value) {
            posX.value = 0
        }
        if(posX.value + main.value?.offsetWidth >= window.innerWidth - maxCriticalValue.value) {
            posX.value = window.innerWidth - main.value?.offsetWidth
        }
        if(posY.value <= maxCriticalValue.value) {
            posY.value = 0
        }
        if(posY.value + main.value?.offsetHeight >= window.innerHeight - maxCriticalValue.value) {
            posY.value = window.innerHeight - main.value?.offsetHeight
        }
    }
}


</script>

<style lang="scss" scoped>
.dialog{
    position: fixed;
    z-index: 999;
    inset: 0;
    // background-color: rgba($color: #000000, $alpha: 0.3);
    .main{
        position: absolute;
        border-radius: 10px;
        // transform-origin:50% 90%;
        animation: dialog-in forwards 400ms ease-in-out;
        max-width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 0 50px #525252;
        backdrop-filter: blur(8px);
        &.full-screen{
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 0;
        }
        .top{
            user-select: none;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            background-color: rgba($color: #fff, $alpha: 0.9);
            align-items: center;
            .action{
                font-size: 20px;
                display: inline-block;
                margin-left: 10px;
                cursor: pointer;
                transition: 200ms;
                &:hover{
                    transform: scale(1.1);
                    background-color: #333333;
                    color: #fff;
                }
            }
        }
        .body{
            flex: 1;
            padding: 10px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            background-color: rgba($color: #fff, $alpha: 0.7);
        }

        .footer{
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            background-color: rgba($color: #fff, $alpha: 0.7);
        }
    }
}

.shake{
    animation: shake-in 200ms infinite ;
}


</style>
