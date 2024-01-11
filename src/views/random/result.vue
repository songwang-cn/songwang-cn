
<template>
    <Dialog 
       width="500px" 
       height="500px" 
       title="抽取结果"
       hide-cancel 
       hide-confirm
     >
        <div class="result">
            <div 
                class="name" 
                v-for="item of param" 
                :key="item.name" 
            >
                {{ item.name }}
            </div>
        </div>
        <template #footer-left>
            <a-button @click="reRandom">重新抽取</a-button>
        </template>
    </Dialog>
  </template>
  
  <script lang="ts" setup>
  import {ref} from "vue"
  import Dialog from '@/components/Dialog.vue'
  
  const props = defineProps({
      param: {
          type: Array<any>,
          default: () => []
      },
      onConfirm: {
          type: Function,
          default: () => {}
      }
  })

  function reRandom() {
    props.onConfirm()
  }
  
  </script>

  <style lang="scss" scoped>
   
   .result{
         width: 100%;
         height: 100%;
         display: flex;
         flex-wrap: wrap;
         align-content: flex-start;
         align-items: center;
         font-size: 40px;
         font-weight: bold;
         .name{
            width: 33%;
            text-align: center;
            height: 100px;
            line-height: 100px;
         }
   }
  
  </style>
  
  