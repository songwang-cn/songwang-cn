
<template>
  <div class="note">
    <div class="input-search">
      <van-field 
        class="inp" 
        placeholder="输入关键字搜索" 
        v-model="searchVal" 
      />
    </div>
    <div class="note-list" :key="fileList.length">
        <NoteItem 
          v-for="item,index in fileList"
          :index="index"
          :key="index"
          :note-info="item" 
        />
    </div>
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
.note{
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.input-search{
  height: 44px;
  padding: 20px 10px;
  position: absolute;
  inset: 0;
  top: 0;
  .inp{
    width: 60%;
    margin: 0 auto;
    border-radius: 20px;
    background-color: rgba(255,255,255,1);
    box-shadow: 0 10px 50px rgba(37,67,98, .5);
  }

  @media screen and (max-width: 478px) {
    .inp{
      width: 100%;
      border-radius: 20px;
    }
  }
}
.note-list{
  padding: 80px 10px 100px 10px;
  user-select: none;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  align-content: flex-start;
}
</style>
