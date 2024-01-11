<template>
    <a-button class="back" @click="AppConfig.router.back()">返回</a-button>
</template>

<script lang="ts" setup>
import AppConfig from '@/config/appConfig';
</script>

<style lang="scss" scoped>
.back{
    position: relative;
    left: 10px;
    top: 10px;
}
</style>
