<template>
 <div class="list">
            <div 
              :class="['card']" 
              v-for="card of appList" 
              @click="card.action && card.action()"
            >
              <SvgIcon 
                :icon="card.icon" 
                :is-svg="card.isSvg" 
                :name="card.name"
                show-name
              />
            </div>
          </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DialogHelper } from '@/helper/DialogHelper';
import SvgIcon from '@/components/SvgIcon.vue';
import Random from '@/views/random/index.vue';
import Note from '@/views/note/index.vue';

const appList = ref([
    {
        name: '微信',
        icon: 'icon-weixin1',
        action: () => alert('微信')
    },
    {
        name: 'Gitee',
        icon: 'icon-logo-gitee-g-red',
        action: () => window.open('https://gitee.com/song-wang', '_blank')
    },
    {
        name: '点名',
        isSvg: false,
        action: () => DialogHelper.show(Random)
    },
    {
        name: '笔记',
        isSvg: false,
        action: () => DialogHelper.show(Note)
    },
])
</script>

<style lang="scss" scoped>
    .list{
        flex: 1;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        .card{
          width: 25%;
          transition: 300ms;
          padding: 10px 0;
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
