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
      <div class="content">
        <Home />
      </div>
      <MessageCenter 
        :isDrag="isDrag" 
        :height="messageCenterHeight"
      />
      <RandomBgTrigger />
      <Bubble />
      <MusicBar />
      <Header />
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
import Home from '@/views/home/index.vue';
import AppConfig from '@/config/appConfig';

const {isDrag, messageCenterHeight, onMouseDown, onMouseMove, onTouchStart, onTouchMove, onDragEnd } = useMessageCenter()


const bgUrl = computed(() => appStore().bgUrl)

 
</script>
  
<style lang="scss" scoped>
  .home{
    user-select: none;
      border-radius: 20px;
      position: fixed;
      inset: var(--window-margin);
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
  