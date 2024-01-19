<template>
    <div :class="['box', appStore().lastOpenAppId === config.id && jumpEnable && 'jump']" :style="{width: size, height: size}" @click="onAction">
        <svg v-if="config.icon" :style="{width: size, height: size}" aria-hidden="true">
            <use :xlink:href="`#${ config.icon}`"></use>
        </svg>
        <div class="un-svg" v-else>{{  config.name }}</div>
    </div>
    <div class="name" v-if="showName">{{  config.name }}</div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import { appStore } from '@/config/store';


const props = defineProps({
    config: {
        type: Object,
        default: () => ({})
    },
    showName:{
        type: Boolean,
        default: false
    },
    jumpEnable: {
        type: Boolean,
        default: false
    }
})

const size = computed(() => props.config.size || '60px')

function onAction() {
  appStore().addAppInPool(props.config)
  props.config.action?.()
}

</script>

<style lang="scss" scoped>
.box{
    margin: 0 auto;
    user-select: none;
    transition: 300ms all;
    cursor: pointer;
    &:active{
        transform: scale(0.9);
    }
}

.jump{
    animation: jump 1.4s ease-in-out;
    animation-iteration-count: 4;
}

@keyframes jump {
    0%{
        transform: translateY(0px);
    }
    50%{
        transform: translateY(-20px);
    }
    100%{
        transform: translateY(0px);
    }
}
.un-svg{
    width: 100%;
    height:100%;
    background-color: #111111;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    font-size: 17px;
    font-weight: bold;
}

.name{
    text-align: center;
    padding-top: 5px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    user-select: none;
}
</style>
