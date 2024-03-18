<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 10:50:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 15:35:21
 * @FilePath: \Vue3vite\src\views\home\index.vue
-->
<template>
  <Panel>
    <Swiper pagination>
      <SwiperSlide>
        <AppTable :list="appList1" />
      </SwiperSlide>
      <SwiperSlide>
        <AppTable :list="appList2" />
      </SwiperSlide>
      <SwiperSlide>
        <Me />
      </SwiperSlide>
      <SwiperSlide>
        <Note />
      </SwiperSlide>
    </Swiper>
  </Panel>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Note from '@/views/note/index.vue';
import Me from '@/views/me/index.vue'
import Panel from '@/components/Panel.vue';
import AppConfig from '@/config/appConfig';
import AppTable from '@/components/AppTable.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

const appList1 = ref(AppConfig.allAppList.slice(0, 4))

const appList2 = ref(AppConfig.allAppList.slice(4, 5))

</script>

<style lang="scss" scoped>
  :deep(.swiper){
    height: 100%;
    cursor: pointer;
    .swiper-slide{
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }

    
</style>