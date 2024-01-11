<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 13:24:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-23 16:42:55
 * @FilePath: \VueJS\src\components\Body.vue
-->
<template>
    <StarBg v-if="isMoveBgType"/>
    <div 
      class="content" 
      :class="[isNormalMenu ? 'normal' : 'un_normal' ]"
      :style="isMoveBgType ? {} : {'background-image': `url(${bgUrl})`}"
      @contextmenu.prevent="UseContextMenu($event)"
    >
        <img v-show="false" :src="bgUrl" />
        <!-- <Menu />  -->
        <div class="right">
          <Header />
          <div class="body">
            <slot />
          </div>
          <Footer />
        </div>
      </div>
  </template>
  
<script setup lang="ts">
import StarBg from './StarBg.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { appStore } from '@/config/store';
import { BgType, MenuType } from '@/enum';
import { computed } from 'vue'
import UseContextMenu from '@/use/UseContextMenu';

const isNormalMenu = computed(() => appStore().menuType === MenuType.NORMAL)

const isMoveBgType = computed(() => appStore().bgType === BgType.MOVE)

const bgUrl = computed(() => appStore().bgUrl)
 
</script>
  
<style lang="scss" scoped>
  .content{
      position: absolute;
      inset: 0;
      display: flex;
      background-size: cover;
      background-position: center center;
      background-color: rgba($color: #000000, $alpha: 0.5);
      overflow: hidden;
      &.normal{
        flex-direction: row;
      }
      &.un_normal{

        
        flex-direction: columns;
      }
      .right{
        height: 100%;
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .body{
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
      }
    }

  </style>
  