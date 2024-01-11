
<template>
    <div style="padding: 10px;display: flex;align-items: center;justify-content: space-around;">
      <a-input placeholder="输入关键字搜索" size="large" style="width: 50%;" v-model:value="searchVal" />
    </div>
    <div class="note_content">
        <NoteItem 
          v-for="item,index in fileList"
          :index="index"
          :note-info="item" 
        />
    </div>
</template>

<script lang="ts" setup>
import NoteItem from './noteItem.vue'
import { ref, computed } from 'vue'

const searchVal = ref('')

const allFile = import.meta.glob('../../assets/my/*.*', {eager: true})

console.log(allFile)

const allfileList = ref([] as any[])

for(let key in allFile){
  console.log(allFile[key])
  allfileList.value.push({
    title: key.split('/').pop()?.split('.').shift(),
    path: (allFile[key] as any).default
  })
}

console.log(allfileList)

const fileList = computed(() => allfileList.value.filter(v => v.title.toLocaleLowerCase().includes(searchVal.value.toLocaleLowerCase())))

</script>

<style lang="scss" scoped>
.note_content{
  user-select: none;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  overflow-y: auto;
  align-content: flex-start;
}
</style>
