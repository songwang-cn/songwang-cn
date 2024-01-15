
<template>
  <Transition name="noteItem">
    <div 
      v-if="show"
      ref="noteItem" 
      class="note_item" 
      @click="onDetail"
      :style="{
         background: appStore().theme === 'light' ? '#fff' : 'rgba(0,0,0,.9)',
         color: appStore().theme === 'light' ? '#111' : '#fff'
      }"
     >
      {{ noteInfo.title }}
    </div>
  </Transition>

</template>

<script lang="ts" setup>
import { DialogHelper } from "@/helper/DialogHelper";
import Detail from "./detail.vue";
import {onMounted, ref} from 'vue'
import { appStore } from "@/config/store";

const props = defineProps({
    index: {
      type: Number,
      default: 0
    },
    noteInfo:{
        type: Object,
        default: null
    }
})


const show = ref(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, props.index*50)
})

function onDetail() {
  console.log(props.noteInfo)
  DialogHelper.show(Detail, props.noteInfo)
}
</script>

<style lang="scss" scoped>

.noteItem-enter-from {
    opacity: 0;
    transform: translateY(50px);
}

.noteItem-enter-to {
    opacity: 1;
    transform: translateY(0);
}
.note_item{
    transition: 200ms;
    width: 18%;
    height: 100px;
    margin: 1%;
    border-radius: 10px;
    font-size: 20px;
    color: #09213ab3;
    font-weight: bold;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    transition: 300ms;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0 0 10px #8a8a8a;
    &:hover{
      transform: scale(1.1);
    }
    &:active{
      transform: scale(0.9);
    }
}

@media screen and (max-width: 501px) {
  .note_item{
    width: 47%;
    margin: 1.5%;
    height: 80px;
    font-size: 17px;
    &:hover{
      transform: scale(1);
    }
  }
}
</style>
