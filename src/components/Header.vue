<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 16:46:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 17:29:06
 * @FilePath: \Vue3vite\src\components\Header.vue
-->
<template>
  <div class="header">
    <div class="left">
      <i class="iconfont icon-xinhao">
        <span>中国电信</span>
      </i>
      <i class="iconfont icon-wifi" />
    </div>
    <div class="time">
      {{ nowTime }}
    </div>
    <div class="right">
      <div class="battery">
        <div class="percent">80%</div>
        <i class="iconfont icon-icon-test" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const nowTime = ref('')

function updateTime() {
  const date = new Date()
  const leftString = date.getHours() >= 12 ? '下午' : '上午'
  const timeStringArr = date.toLocaleTimeString().split(':')
  timeStringArr.pop()
  nowTime.value = leftString + ' ' + timeStringArr.join(':')
}

updateTime()

setInterval(() => {
  updateTime()
}, 1000)

console.log( navigator.userAgent)

</script>

<style lang="scss">
.header {
  height: 30px;
  padding: 5px 10px;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left, .right{
    width: 30%;
  }

  .right{
    display: flex;
    justify-content: flex-end;
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

@media screen and (max-width: 478px) {
  .header{
    display: none;
  }
}


</style>
