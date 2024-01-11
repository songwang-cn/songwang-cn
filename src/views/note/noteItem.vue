
<template>
  <Transition name="noteItem">
    <div v-if="show" ref="noteItem" class="note_item" @click="onDetail">
      {{ noteInfo.title }}
    </div>
  </Transition>

</template>

<script lang="ts" setup>
import { DialogHelper } from "@/helper/DialogHelper";
import Detail from "./detail.vue";
import {onMounted, ref} from 'vue'

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
    width: 20%;
    height: 150px;
    line-height: 150px;
    transform: scale(0.95);
    background-color: rgba($color: #000, $alpha: 0.2);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    margin-bottom: 10px;
    color: #fff;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    padding: 0 10px;
    transition: 300ms;
    cursor: pointer;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0 0 2px #fff;
    &:hover{
      transform: scale(1.02);
      z-index: 999;
    }
}

@media screen and (max-width: 768px) {
  .note_item{
    width: 33.3%;
    height: 70px;
    font-size: 14px;
    font-weight: 400;
    word-break: break-all;
  }
}
</style>
