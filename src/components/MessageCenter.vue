<template>
  <div 
    :class="['message-center', !isDrag && 'over']"
    :style="{
        height: height + 'px',
    }"
  >
    <div class="time">
        <div>{{ `${HH}:${mm}` }}</div>
        <div class="date-week">{{ `${MM}月${DD}日 ${WEEK}` }}</div>
        <div class="non-date"></div>
    </div>
    <div ref="List" class="message-list">
        <div class="item" v-for="item of 20"></div>
    </div>
    <div class="slidBar">
        <i class="iconfont icon-shanglashouqi" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {UseTime} from '@/use/UseTime'

const {MM, DD, HH, mm, WEEK} = UseTime()

const List = ref()

defineProps({
    height:{
        type: Number,
        default: 0,
    },
    isDrag:{
        type: Boolean,
        default: false,
    },
})

</script>

<style lang="scss" scoped>
.message-center{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(138, 138, 138, 0.95);
    z-index: 2000;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &.over{    
        transition: 500ms all;
    }
    
    .time{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        color: #fff;
        font-size: 80px;
        text-align: center;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        letter-spacing: 5px;
        font-weight: 100;
        padding: 100px 0 40px 0;
        background: linear-gradient(to bottom, rgb(126, 126, 126) 0%, rgba(107, 107, 107, 0) 100%);
        .date-week{
            font-size: 22px;
            font-weight: 400;
        }
        .non-date{
            font-size: 10px;
        }
    }

    .message-list{
        padding: 250px 20px 40px 20px;
        flex: 1;
        overflow-y: auto;
        .item{
            width: 100%;
            margin-top: 20px;
            height: 70px;
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 0 5px #747474;
            transition: 200ms all;
            cursor: pointer;
            &:active{
                transform: scale(.95);
            }
        }
    }
    .slidBar{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
        // background: linear-gradient(to top, rgb(187, 187, 187) 0%, rgba(107,107,107, 0) 100%);
        .iconfont{
            color: #fff;
            display: inline-block;
            font-size: 12px;
            animation: jump 1.5s infinite linear;
        }
        @keyframes jump {
            0%{
                transform: translateY(5px);
            }
            50%{
                transform: translateY(0px);
            }
            100%{
                transform: translateY(5px);
            }
        }
    }
}
</style>
