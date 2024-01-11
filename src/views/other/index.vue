
<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 10:50:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-07 16:20:00
 * @FilePath: \Vue3vite\src\views\other\index.vue
-->

<template>
  <Panel>
    <template #body>
      <div class="list">
          <div class="card" v-for="card of cardList" @click="onCard(card)">
            <img v-show="false" src="https://static.wetab.link/widget-background/background01_larg.jpg?imageView2/2/w/1064/format/webp" />
              {{ card.name }}
          </div>
        </div>
    </template>
  </Panel>

</template>

<script setup lang="ts">
import {ref, Ref} from 'vue'
import Panel from '@/components/Panel.vue';
import { DialogHelper } from '@/helper/DialogHelper';
import CodeDiff from '@/views/codeDiff/index.vue';

const title = ref()

const cardList = ref([
  {
    name: '代码简易对比工具',
    component: CodeDiff
  }
])

function onCard(card: any) {
  DialogHelper.show(card.component)
}

</script>

<style lang="scss" scoped>
    .list{
        flex: 1;
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        // overflow-y: auto;
        // justify-content: space-between;
        align-content: center;
        perspective: 500px;
      .card{
        width: 33.3%;
        line-height: 200px;
        background-image: url('https://static.wetab.link/widget-background/background01_larg.jpg?imageView2/2/w/1064/format/webp');
        background-size: cover;
        text-align: center;
        background-color: rgba(0,0,0,0.6);
        font-size: 40px;
        font-weight: bold;
        color: #fff;
        border-radius: 10px;
        transition: all 300ms;
        cursor: pointer;
        transform: scale(0.9);
        margin-bottom: 5px;
        transform-style: preserve-3d;
        user-select: none;
        &:hover{
          transform: translateY(-10px);
        }
      }
    }

    @media screen and (max-width: 768px) {
      .list{      
        .card{
          width: 50%;
          line-height: 80px;
          font-size: 14px;
          white-space: nowrap;
        }
      }
    }
</style>