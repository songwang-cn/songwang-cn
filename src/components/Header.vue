<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 16:46:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 17:29:06
 * @FilePath: \Vue3vite\src\components\Header.vue
-->
<template>
  <div class="app-header">
    <div class="left">
      <i class="iconfont icon-xinhao">
        <span>中国电信</span>
      </i>
      <i class="iconfont icon-wifi" />
    </div>
    <div class="time">
      {{ `${leftString} ${HH}:${mm}` }}
    </div>
    <div class="right">
      <div class="lock iconfont icon-guanji" @click="AppConfig.router.replace('/login')"/>
      <div class="battery">
        <div class="percent">80%</div>
        <i class="iconfont icon-icon-test" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppConfig from '@/config/appConfig';
import {UseTime} from '@/use/UseTime'

const { HH, mm, leftString } = UseTime()

</script>

<style lang="scss">
.app-header {
  height: 30px;
  padding: 5px 10px;
  display: flex;
  position: absolute;
  inset: 0;
  align-items: center;
  justify-content: space-between;
  z-index: 997;
  .left, .right{
    width: 30%;
  }

  .right{
    display: flex;
    justify-content: flex-end;

    .lock{
      margin-right: 20px;
      cursor: pointer;
    }
  }

  .iconfont{
    color: #fff;
    margin: 0 5px;
    font-size: 17px;
    display: inline-flex;
    align-items: center;
    span{
      font-size: 12px;
      display: inline-block;
      padding-left: 5px;
    }
  }

  .battery{
    display: flex;
    align-items: center;
    .percent{
      font-size: 12px;
      font-weight: 300;
      color: #fff;
    }
  }

  .time {
    letter-spacing: 1px;
    color: #fff;
    user-select: none;
    font-size: 14px;
    cursor: pointer;
  }

}

@media screen and (max-width: 501px) {
  .app-header{
    display: none;
  }
}


</style>
