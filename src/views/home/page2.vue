<template>
    <AppTable :list="appList" />
</template>
   
<script lang="ts" setup>
import { ref } from 'vue'
import AppTable from '@/components/AppTable.vue';
import AppConfig from '@/config/appConfig';
   
const appList = ref(AppConfig.allAppList.slice(4, 5))
</script>
   
   