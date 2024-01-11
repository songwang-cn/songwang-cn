<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-25 17:57:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-25 17:58:41
 * @FilePath: \VueJS\src\components\Spin.vue
-->
<template>
  <div class="spin">
    <a-spin size="large" :spinning="isSpining" />
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"

const isSpining = ref(false)
</script>

<style lang="scss" scoped>
.spin{
    position: fixed;
    inset: 0;
    z-index: 9999;
}
</style>
