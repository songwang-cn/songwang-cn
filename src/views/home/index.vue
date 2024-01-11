<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 10:50:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-19 15:35:21
 * @FilePath: \Vue3vite\src\views\home\index.vue
-->
<template>
  <Panel @mousedown="isLongClick=false">
    <template #body>
      <div class="list">
          <div 
            :class="['card', isLongClick ? 'shake' : '']" 
            v-for="card of appList" 
            @mousedown="onMouseDown"
            @mouseup="onMouseUp(card)"
          >
            <SvgIcon :icon="card.icon" />
          </div>
        </div>
    </template>
  </Panel>

</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import Panel from '@/components/Panel.vue';
import { DialogHelper } from '@/helper/DialogHelper';
import SvgIcon from '@/components/SvgIcon.vue';
import AppDialog from '@/views/AppDialog/index.vue';

const time =  ref(0)

const isLongClick = ref(false)

let timer = ref(null as any)

function onMouseDown() {
  time.value = Date.now()
  clearInterval(timer.value)
  timer.value = setInterval(() => {
    isLongClick.value = Date.now() - time.value > 1200
  }, 100)
}

function onMouseUp(card: any) {
  isLongClick.value = Date.now() - time.value > 1200
  clearInterval(timer.value)
  time.value = Date.now()
  if(!isLongClick.value) {
    onCard(card)
  }
}



const appList = ref([
    {
        name: '微信',
        icon: 'icon-weixin1'
    },
    {
        name: 'Gitee',
        icon: 'icon-logo-gitee-g-red'
    },
])


function onCard(card: any) {
  DialogHelper.show(AppDialog, card)
}

</script>

<style lang="scss" scoped>
    .list{
        flex: 1;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: flex-start;
        .card{
          padding: 10px;
          width: auto;
          transition: 300ms;
          cursor: pointer;
          &:hover{
            transform: scale(1.1);
          }
          &:active{
           transform: scale(0.9);
          }
        }
        .shake{
          animation: shake 0.2s infinite;
        }

        @keyframes shake {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(-5deg);
          }
        }
    }
    
</style>