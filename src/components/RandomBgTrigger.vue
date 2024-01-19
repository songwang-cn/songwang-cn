<template>
  <div 
    class="trigger" 
    @click="onRandomTrigger"
    :style="{
        height: height + 'px'
    }"
  >
    <div>随机壁纸</div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {UseRandomBg} from "@/use/UseRandomBg"

const defaultH = 50

const height = ref(defaultH)

async function onRandomTrigger() {
    height.value = 100
    await UseRandomBg()
    height.value = defaultH
}
</script>

<style lang="scss" scoped>

.trigger{
    width: 2px;
    transition: 500ms;
    background-color: #fff;
    position: absolute;
    inset: 0;
    margin: 0 auto;
    z-index: 999;
    box-shadow: 0 0 10px #949494;
    div{
      box-shadow: 0 0 10px #bbbbbb;
      display: block;
      background: #fff;
      position: absolute;
      bottom: -40px;
      font-size: 12px;
      border-radius: 100%;
      padding: 10px;
      left: -24px;
      width: 30px;
      height: 30px;
      text-align: center;
      transform: scale(.8);
      letter-spacing: 1px;
      cursor: pointer;
    }
}
</style>
