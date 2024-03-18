<template>
  <div class="content">
    <van-image height="80%" :src="Page1Png"></van-image>
    <van-image height="80%" :src="Page2Png"></van-image>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import Page1Png from '@/assets/img/page1.png'
import Page2Png from '@/assets/img/page2.png'
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
}
</style>
