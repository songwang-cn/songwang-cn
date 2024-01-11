<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-26 21:41:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 15:45:11
 * @FilePath: \Vue3vite\src\components\ContextMenu.vue
-->
<template>
    <div
      class="menu" 
      ref="menu"
      :style="menuStyle"
    >
      <div 
        class="menu_item" 
        v-for="item of menu" @click="onItemClick(item)"
      >
        {{ (item as any).name }}
      </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, computed} from "vue"
import UseChangeBg from "@/use/UseChangeBg";
import UseConfigPanel from "@/use/UseConfigPanel";
import AppConfig from "@/config/appConfig";

onMounted(() => {
    document.addEventListener('mousedown', (e) => {
      if((e.target as HTMLElement).className !== 'menu_item' && (e.target as HTMLElement).className !== 'menu'){
        props.onClose()
      }
    }, true)
})

const props = defineProps({
    event: {
        type: MouseEvent,
        default: () => {}
    },
    menu: {
        type: Array,
        default: () => [
          {
              name: '更换壁纸',
              do: () => {
                  UseChangeBg()
              }
          },
          {
              name: '刷新',
              do: () => {
                  window.location.reload()
              }
          },
          {
              name: '设置',
              do: () => {
                  UseConfigPanel()
              }
          },
          {
              name: '回到首页',
              do: () => {
                  AppConfig.router.push({path: '/'})
              }
          }
      ]
    },
    onAction: {
        type: Function,
        default: () => {}
    },
    onClose: {
        type: Function,
        default: () => {}
    }
})

function onItemClick(item: any) {
    item.do()
    props.onAction()
}

const menuStyle = computed(() => ({
    left: props.event?.clientX + 120 > window.innerWidth ? props.event?.clientX - 120 + 'px' : props.event?.clientX + 'px',
    top: props.event?.clientY + props.menu.length * 30 > window.innerHeight ? props.event?.clientY - props.menu.length * 30 + 'px' : props.event?.clientY + 'px',
    transformOrigin: props.event?.clientY + props.menu.length * 30 > window.innerHeight ? '50% 100%' : '50% 0'
    
}))

</script>

<style lang="scss" scoped>
.menu{
  user-select: none;
  position: absolute;
  width: 120px;
  border-radius: 5px;
  background-color: rgba($color: #fff, $alpha: 0.8);
  backdrop-filter: blur(3px);
  animation: menu-open 100ms forwards ease-in-out;
  // transform-origin: 50% 0;
  box-shadow: 0 0 30px #888888;
  .menu_item{
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #575757;
    cursor: pointer;
    width: 100%;
    transition: 200ms;
    &:hover{
      background-color: rgba($color: #fff, $alpha: 0.5);
    }
    &:active{
        background-color: #575757;
        color: #fff;
    }
  }
}

</style>
