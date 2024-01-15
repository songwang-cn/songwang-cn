<template>
    <AppTable :list="appList" />
</template>
   
<script lang="ts" setup>
import { ref } from 'vue'
import AppTable from '@/components/AppTable.vue';
   
  const appList = ref([
    {
      name: '谷歌',
      icon: 'icon-Chrome',
      action: () => window.open('https://www.baidu.com/', '_blank')
    }
  ])
</script>
   
   