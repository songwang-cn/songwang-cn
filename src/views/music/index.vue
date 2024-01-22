<template>
    <Dialog title="音乐搜索">
        <van-field v-model="keyword" />
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Dialog from "@/components/Dialog.vue"

const keyword = ref('')


</script>

<style lang="scss" scoped>

</style>
