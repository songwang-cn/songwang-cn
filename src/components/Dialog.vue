<template>      
    <div :class="['dialog', isClosing && 'on-close']">  
        <div ref="main" class="main">
            <div class="dialog_top">
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
                    <van-button @click="onClose()"   v-if="!hideCancel">取消</van-button>
                    <slot name="footer-center"/>
                    <van-button type="primary" v-if="!hideConfirm">确定</van-button>
                    <slot name="footer-right"/>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useSlots, ref } from "vue";

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



</script>

<style lang="scss" scoped>
.dialog{
    position: absolute;
    z-index: 999;
    inset: 0;
    .main{
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 10px;
        transform-origin: 50% 80%;
        animation: dialog-in forwards 300ms ease-in-out;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 0 50px #525252;
        background: #fff;
        .dialog_top{
            user-select: none;
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
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

    @media screen and (max-width: 478px) {
        .main{
         border-radius: 0;
        }
    }
}

.on-close{
    animation: dialog-in reverse forwards 300ms ease-in-out;
}
</style>
