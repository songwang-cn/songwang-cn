<template>      
    <FullScreenWrapper
        is-open
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
        @close="closeHandler()"
        :class="isClosing && 'closing'"
        :show-bg="false"
    >
        <div 
            ref="main" 
            class="main"
            :style="{
                background: appStore().theme === 'light' ? '#fff' : '#1c1c1e',
                color: appStore().theme === 'light' ? '#111' : '#fff',
                height: height + 'px',
                width: width + 'px',
                top: posY + 'px',
                left: posX + 'px'
            }"
        >
            <div 
                class="dialog_top"
                @mousedown="onMouseDown"
                :style="{
                    cursor: isDraging ? 'grabbing' : 'grab'
                }"
            >
                <div class="left">
                    <i @click.self="closeHandler()" class="back iconfont icon-arrow-left" />
                </div>
                <div class="title">{{ title }}</div>
                <div class="right">
                    <slot name="right" />
                </div>
            </div>
            <div class="dialog_body">
                <slot>
                    内容
                </slot>
            </div>
            <div class="dialog_footer" v-if="!hideCtrl">
                <slot name="footer">
                    <slot name="footer-left"/>
                    <!--<van-button @click="onClose()" v-if="!hideCancel">取消</van-button> -->
                    <slot name="footer-center"/>
                    <!--<van-button type="primary" v-if="!hideConfirm">确定</van-button> -->
                    <slot name="footer-right"/>
                </slot>
            </div>
        </div>
    </FullScreenWrapper>
</template>

<script lang="ts" setup>
import { appStore } from "@/config/store";
import { computed, ref } from "vue";
import FullScreenWrapper from "./FullScreenWrapper.vue";

const props = defineProps({
    title: {
        type: String,
        default: '弹窗标题'
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

const isClosing = ref(false)

function closeHandler() {
    isClosing.value = true
    setTimeout(() => {
        props.onClose()
    }, 400)
}

const isPc = computed(() => {
    return window.innerWidth > 500
})

const width = ref(isPc.value ? window.innerWidth * .6 : window.innerWidth)

const height = ref(isPc.value ? window.innerHeight * .7 : window.innerHeight)

const posX = ref(isPc.value ? (window.innerWidth - width.value) / 2 : 0)

const posY = ref(isPc.value ? (window.innerHeight - height.value) / 2 : 0)

/**
 * 记录下点击时鼠标在拖动元素内部的偏移量
 */
 const offsetX = ref(0)

const offsetY = ref(0)

const isShaking = ref(false)

const isFullScreen = ref(false)

const isDraging = ref(false)

const main = ref()

/**
 * 四周吸附效果的临界值，小于这个值就吸附
 */
 const maxCriticalValue = ref(10)

function onMouseDown(e: MouseEvent) {
    if(!isFullScreen.value && e.target?.className === 'dialog_top') {
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
       /*  if(posX.value <= maxCriticalValue.value) {
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
        } */
    }
}

</script>

<style lang="scss" scoped>
.main{
        position: absolute;
        border-radius: 20px;
        transform-origin: 50% 80%;
        animation: dialog-in forwards 300ms ease-in-out;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 0 30px #111;
        .dialog_top{
            user-select: none;
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: grab;
            .left, .right{
                width: 20%;
            }
            .left{
                .back{
                    font-size: 16px;
                    display: inline-block;
                    margin-left: 5px;
                    cursor: pointer;
                }
            }

            .title{
                font-size: 18px;
                font-family:'PingFangSC-Medium';
                font-weight: bold;
            }

        }

        .dialog_body{
            flex: 1;
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }

        .dialog_footer{
            padding:10px 15px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            :deep(button){
                margin-left: 10px;
            }
        }
}

    @media screen and (max-width: 501px) {
        .main{
         border-radius: 0;
        }
    }

.closing{
    animation: dialog-in reverse forwards 300ms ease-in-out;
}
</style>
