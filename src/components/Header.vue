<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 16:46:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 17:29:06
 * @FilePath: \Vue3vite\src\components\Header.vue
-->
<template>
  <div class="header">
    <div class="actions">
        <i v-for="route of AppConfig.router.getRoutes()" @click="AppConfig.router.push(route.path)" :class="`action iconfont ${route.meta.icon}`" />
        <i class="action iconfont icon-shezhi-xianxing" @click="UseConfigPanel" />
    </div>
    <img @click="AppConfig.router.push('/')" :src="Logo" style="height: 30px; width: 30px;"/>
    <div class="time" @click="UseClander($event, 300)">
      {{ nowTime }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppConfig from '@/config/appConfig'
import { DialogHelper } from '@/helper/DialogHelper';
import ConfigModal from '@/views/config/index.vue'
import { ref } from 'vue'
import UseConfigPanel from '@/use/UseConfigPanel';
import Clander from './Clander.vue';
import UseClander from '@/use/UseClander';
import Logo from '@/assets/img/3.ico';

const nowTime = ref('')

setInterval(() => {
  const date = new Date()
  nowTime.value = date.getHours() + ':' + getNum(date.getMinutes()) + ':' + getNum(date.getSeconds())
}, 1000)

function getNum(num: number) {
  return num >= 10 ? num : `0${num}`
}

console.log( navigator.userAgent)

</script>

<style lang="scss">
:deep(.ant-popover-inner) {
  background-color: red;
}

.header {
  height: 40px;
  padding: 5px 10px;
  background-color: rgba($color: #fff, $alpha: 0.2);
  backdrop-filter: blur(5px);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .time {
    letter-spacing: 1px;
    color: #fff;
    user-select: none;
    font-family: 'LCD';
    font-size: 20px;
    cursor: pointer;
  }

  .actions {
    .action {
      font-size: 20px;
      margin-right: 15px;
      transition: 20ms;
      transition: 300ms;
      color: #000;
      cursor: pointer;

      &:active {
        transform: scale(0.9);
      }
    }
  }

}

@media screen and (max-width: 768px) {
  .header{
    .actions{
      .action{
        font-size: 16px;
        color: #fff;
      }
    }
    .time{
      width: 120px;
      white-space: nowrap;
      text-align: right;
      font-size: 16px;
    }
  }
}
</style>
