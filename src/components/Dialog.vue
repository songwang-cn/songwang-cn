<template>      
        <div 
            ref="main" 
            :class="`main ${dialogKey} ${isClosing ? 'closing' : 'opening'} ${isFullScreen && 'fullscreen'}`"
            @mousedown="onThisDialog"
            :style="{
                background: appStore().theme === 'light' ? '#fff' : '#1c1c1e',
                color: appStore().theme === 'light' ? '#111' : '#fff',
                height: height + 'px',
                width: width + 'px',
                top: posY + 'px',
                left: posX + 'px',
                zIndex
            }"
        >
            <div 
                class="dialog_top"
                @mousedown="onMouseDown"
                :style="{
                    backgroundColor: appStore().theme === 'light' ? '#f1f1f1' : '#1c1c1e',
                    borderColor: appStore().theme === 'light' ? '#ddd' : '#1c1c1e',
                    // cursor: isDraging ? 'grabbing' : 'grab'
                }"
            >
                <div class="left">
                    <i @click.self="closeHandler()" :class="`iconfont ${isPc ? 'close icon-macguanbi' : 'm_close icon-arrow-left'}`" />
                    <i v-if="isPc" @click.self="closeHandler()" class="mini iconfont icon-zuixiaohua" />
                    <i v-if="isPc" @click.self="onFullScreen()" class="full iconfont icon-a-screen_full_macquanping" />
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
</template>

<script lang="ts" setup>
import { appStore } from "@/config/store";
import { computed, ref } from "vue";
import { onMounted } from "vue";
import { UseIsPc } from "@/use/UseIsPc";

const { isPc } = UseIsPc();

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

const dialogKey = ref(Date.now()+'')

localStorage.setItem('topDialogKey', dialogKey.value)

const zIndex = ref(999)

function onThisDialog() {
    const topDialogKey = localStorage.getItem('topDialogKey')
    if(dialogKey.value !== topDialogKey) {
        zIndex.value++
        localStorage.setItem('topDialogKey', dialogKey.value)
    }
}

onMounted(() => {
    document.body.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mouseup', onMouseUp)
})

const isClosing = ref(false)

function closeHandler() {
    isClosing.value = true
    setTimeout(() => {
        props.onClose()
    }, 1000)
}

const isFullScreen = ref(!isPc.value)

function onFullScreen() {
    if(!isFullScreen.value) {
        height.value = window.innerHeight
        width.value = window.innerWidth
        isFullScreen.value = true
        posX.value = 0
        posY.value = 0
    }else{
        height.value = window.innerHeight * .7
        width.value = window.innerWidth * .6
        posX.value = (window.innerWidth - width.value) / 2
        posY.value = (window.innerHeight - height.value) / 2
        setTimeout(() => {
            isFullScreen.value = false
        }, 500)
    }

}

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
.main{
        position: absolute;
        border-radius: 10px;
        transform-origin: 50% 80%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 0 30px #414141;

        &.fullscreen{
            border-radius: 0;
            transition: 500ms;
        }
        .dialog_top{
            user-select: none;
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid;
            // cursor: grab;
            .left, .right{
                width: 10%;
                display: flex;
            }
            .left{
                &:hover{
                    .iconfont{
                        color: #000;
                    }
                }
                .iconfont{
                    font-size: 12px;
                    display: inline-block;
                    margin-right: 10px;
                    cursor: default;
                    border-radius: 100%;
                    padding: 2px;
                    color: transparent;
                    transition: 200ms;
                }
                .close{
                    background-color: rgb(211, 2, 2);
                }
                .m_close{
                    color: var(--van-text-color);
                    font-size: 16px;
                }
                .mini{
                    background-color: rgb(241, 157, 1);
                }
                .full{
                    background-color: rgb(0, 182, 39);
                }
            }

            .title{
                font-size: 17px;
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

.opening{
    animation: dialog-in forwards 300ms ease-in-out;
}

.closing{
    animation: dialog-out forwards 300ms ease-in-out;
}

    @media screen and (max-width: 501px) {
        .main{
         border-radius: 0;
        }
    }

</style>
