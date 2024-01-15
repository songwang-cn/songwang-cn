<template>
  <van-config-provider :theme="(appStore().theme as any)">
    <Body>
      <router-view />
    </Body>
  </van-config-provider>
</template>

<script setup lang="ts">
import Body from '@/components/Body.vue'
import { appStore } from './config/store';
</script>

<style lang="scss">
  body{
    background-color: #111;
  }
</style>