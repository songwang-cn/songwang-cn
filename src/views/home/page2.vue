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
   
   const appList = ref([
       {
           name: '谷歌',
           icon: 'icon-Chrome',
           action: () => window.open('https://www.baidu.com/', '_blank')
       }
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
   