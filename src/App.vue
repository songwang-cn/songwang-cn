<template>
  <ConfigProvider
    :theme="Theme"
  >
    <Body>
      <router-view />
    </Body>
  </ConfigProvider>
</template>

<script setup lang="ts">
import Body from '@/components/Body.vue'
import { ConfigProvider } from 'ant-design-vue'
import Theme from '@/theme/index'
</script>