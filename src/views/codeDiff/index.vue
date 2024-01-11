<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-24 09:14:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-26 13:50:08
 * @FilePath: \VueJS\src\views\codeDiff\index.vue
-->
<template>
  <Dialog>
    <div class="content">
      <div class="left">
        左<input type="file" ref="file" @change="getFileL" />
        <div ref="leftRef" class="left panel" />
      </div>
      <div class="right">
        右<input type="file" ref="file" @change="getFileR" />
        <div ref="rightRef" class="right panel" />
      </div>
    </div>
  </Dialog>

</template>

<script lang="ts" setup>
import {ref, watchEffect, nextTick} from "vue"
import Dialog from "@/components/Dialog.vue";

const leftCode = ref([] as string[])
const rightCode = ref([] as string[])

const leftRef = ref()
const rightRef = ref()


function getFileL(event: any) {
  getFileStringL(event?.target.files[0])
}

function getFileR(event: any) {
  getFileStringR(event?.target.files[0])
}

  function getFileStringL(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      let content = reader.result as string; 
      let lines = content?.split('\r'); // 以换行符分隔CSV文件内容
      const newLines: string[] = []
      lines.map((line: any) => {
        if(line.indexOf('\n') === 0) {
          line = line.substring(1, line.length)
        }
        newLines.push(line)
      })
      leftCode.value = newLines
    }
  
    reader.readAsText(file)
  }
  function getFileStringR(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      let content = reader.result as string;
      let lines = content?.split('\r'); // 以换行符分隔CSV文件内容
      const newLines: string[] = []
      lines.map((line: any) => {
        if(line.indexOf('\n') === 0) {
          line = line.substring(1, line.length)
        }
        newLines.push(line)
      })
      rightCode.value = newLines
    }
  
    reader.readAsText(file)
  }
  

watchEffect(() => {
    if(leftRef.value && rightRef.value) {
        leftRef.value.innerHTML = ''
        rightRef.value.innerHTML = ''
    }
    for(let i = 0; i < Math.max(leftCode.value.length, rightCode.value.length); i++){
        leftRef.value.innerHTML += `<div class="${leftCode.value[i] !== rightCode.value[i] ? 'diff' : ''}"><span class="line_index">${i+1}</span><code>${leftCode.value[i] || ''}</code></div>`   
        rightRef.value.innerHTML += `<div class="${leftCode.value[i] !== rightCode.value[i] ? 'diff' : ''}"><span class="line_index">${i+1}</span><code>${rightCode.value[i] || ''}</code></div>`
    }
})

</script>

<style lang="scss" scoped>
.content{
    display: flex;
    .left, .right{
        color: #fff;
        flex: 1;
        padding: 10px;
        white-space: nowrap;
        overflow-x: auto;
        :deep(.diff){
            background-color: rgb(190, 7, 7);
        }
        :deep(.line_index){
            font-size: 12px;
            display: inline-block;
            width: 40px;
        }
    }
    
    .right{
        border-left: 1px solid #fff;
    }
    .panel{
        background-color: #1d1d1d;
    }
}
</style>
