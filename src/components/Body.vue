<template>
    <div 
      id="home"
      :key="homeKey"
      class="home" 
      :style="{
        'background-image': `url(${bgUrl})`
      }"
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
        :bottom="bottom"
      />
      <RandomBgTrigger />
      <Bubble />
      <MusicBar />
      <Header />
      <Footer />
    </div>
  </template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

const {isDrag, bottom, onMouseDown, onMouseMove, onTouchStart, onTouchMove, onDragEnd } = useMessageCenter()

const homeKey = ref(0)

const bgUrl = computed(() => appStore().bgUrl)

onMounted(() => {
  window.onresize = () => {
    homeKey.value = Date.now()
    console.log('resize')
  }
})


 
</script>
  
<style lang="scss" scoped>
  .home{
    user-select: none;
    position: fixed;
    inset: 0;
    display: flex;
    background-size: cover;
    background-repeat: no-repeat;
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

  </style>
  