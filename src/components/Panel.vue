<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 14:54:14
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-28 02:13:53
 * @FilePath: \Vue3vite\src\components\Panel.vue
-->
<template>
  <div class="panel">
    <slot name="body"></slot>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
</script>

<style lang="scss" scoped>
.panel{
    // background-color: rgba($color: #000000, $alpha: 0.5);
    height: 100%;
    border-radius: 10px;
    animation: panel-show 0.5s ease-in-out;
    display: flex;
    flex-direction: column;

    @keyframes panel-show{
        0%{
            opacity: 0;
            transform: translateX(50px);
        }
        100%{
            opacity: 1;
            transform: translateX(0);
        }
    }
}
</style>
