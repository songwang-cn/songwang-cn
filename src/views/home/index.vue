<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 10:50:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 15:35:21
 * @FilePath: \Vue3vite\src\views\home\index.vue
-->
<template>
  <Panel>
    <template #body>
      <van-swipe 
        class="my-swipe" 
        indicator-color="white"
      >
        <van-swipe-item>
          <Page1 />
        </van-swipe-item>
        <van-swipe-item>
          <Page2 />
        </van-swipe-item>
        <van-swipe-item>
          <Note />
        </van-swipe-item>
      </van-swipe>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import Panel from '@/components/Panel.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Note from '@/views/note/index.vue';
import Page1 from './page1.vue';
import Page2 from './page2.vue';

</script>

<style lang="scss" scoped>
  .my-swipe{
    flex: 1;
    margin-bottom: 90px;
    cursor: pointer;
    .van-swipe-item{
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }

    
</style>