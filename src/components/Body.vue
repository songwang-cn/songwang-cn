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
    >
      <Header />
        <div class="content">
          <Bubble />
          <MusicBar />
          <slot />
        </div>
      <Footer />
    </div>
  </template>
  
<script setup lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';
import { appStore } from '@/config/store';
import { computed } from 'vue'
import Bubble from '@/components/Bubble.vue';
import MusicBar from '@/components/MusicBar.vue'

const bgUrl = computed(() => appStore().bgUrl)
 
</script>
  
<style lang="scss" scoped>
  .home{
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
  