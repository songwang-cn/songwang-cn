
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
    width: 47%;
    height: 80px;
    margin: 1.5%;
    border-radius: 10px;
    background-color: rgba(255,255,255,0.9);
    font-size: 17px;
    color: #0d2e4eb3;
    font-weight: bold;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    transition: 300ms;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0 0 20px #b1b1b1;
    &:active{
      transform: scale(0.9);
    }
}
</style>
