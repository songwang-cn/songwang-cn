<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 13:24:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-23 16:42:55
 * @FilePath: \VueJS\src\components\Body.vue
-->
<template>
    <div 
      id="home"
      class="home" 
      :style="{'background-image': `url(${bgUrl})`}"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onDragEnd"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onDragEnd"
    >
      <MessageCenter 
        :isDrag="isDrag" 
        :height="messageCenterHeight"
      />
      <RandomBgTrigger />
      <Bubble />
      <MusicBar />
      <Header />
      <div class="content">
        <slot />
      </div>
      <Footer />
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { appStore } from '@/config/store';
import { computed } from 'vue'
import Bubble from '@/components/Bubble.vue';
import MusicBar from '@/components/MusicBar.vue'
import MessageCenter from './MessageCenter.vue';
import RandomBgTrigger from './RandomBgTrigger.vue';
import {useMessageCenter } from '@/use/UseMessageCenter'

const {isDrag, messageCenterHeight, onMouseDown, onMouseMove, onTouchStart, onTouchMove, onDragEnd } = useMessageCenter()


const bgUrl = computed(() => appStore().bgUrl)
 
</script>
  
<style lang="scss" scoped>
  .home{
    user-select: none;
      border-radius: 10px;
      position: fixed;
      inset: 12px;
      display: flex;
      background-size: cover;
      background-position: center center;
      background-color: rgba($color: #000000, $alpha: 0.5);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: 400ms all ease-in-out;
      .content{
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
      }
    }

    @media screen and (max-width: 501px) {
      .home{
        position: relative;
        inset: 0;
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }
  }

  </style>
  