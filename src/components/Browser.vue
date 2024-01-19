<template>
  <Dialog title="浏览器">
     <iframe :data="param.url" height="100%"/>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "./Dialog.vue";
    defineProps({
        param:{
            type: Object,
            default: () => ({})
        }
    })
</script>

<style lang="scss" scoped></style>
