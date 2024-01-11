<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-21 13:14:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-27 17:09:11
 * @FilePath: \VueJS\src\views\biographical\index.vue
-->
<template>
  <Panel>
    <template #body>
      <!--<header>
         <img src="@/assets/img/me.jpg" width="125" />
        <img src="@/assets/svg/ktm-racing.svg" width="125" />
        <span>TEST</span>
      </header>
      <Experiences /> -->
      <!-- <a-select style="width: 400px;" v-model:value="chosePdfUrl">
        <a-select-option v-for="item in allPdfUrl" :value="item.url">
          {{ item.name }}
        </a-select-option>
      </a-select>
      <iframe style="width: 100%; height: 100%;" :src="chosePdfUrl"></iframe> -->
      <div style="height: 100%;display: flex;justify-content: space-evenly;">
        <a-image
          height="100%"
          :src="Page1"
        />
        <a-image
          height="100%"
          :src="Page2"
        />
      </div>

    </template>
  </Panel>
</template>
  
  <script lang="ts" setup>
  import {ref} from 'vue'
  import Experiences from '@/views/components/Experiences.vue'
  import Panel from '@/components/Panel.vue';
  import Page1 from "@/assets/img/page1.png"
  import Page2 from "@/assets/img/page2.png"
  import UseLockMask from '@/use/UseLockMask'

  // UseLockMask()

  let allPdfUrl = [] as any[]

  for(let key in import.meta.glob('../../assets/pdf/*.pdf')){
    allPdfUrl.push({
      name: key.split('/').pop(),
      url: new URL(key, import.meta.url).href
    })
  }

  const chosePdfUrl = ref()

  chosePdfUrl.value = allPdfUrl[0].url

  console.log(allPdfUrl)
  
  </script>
  
  <style scoped>

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }


  </style>
  