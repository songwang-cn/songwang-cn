<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-26 19:30:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-27 10:43:36
 * @FilePath: \VueJS\src\views\AppDialog\index.vue
-->
<template>
    <Dialog :title="param.name" hide-ctrl>
        <SvgIcon :icon="param.icon" />
    </Dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import Dialog from "@/components/Dialog.vue";
import SvgIcon from '@/components/SvgIcon.vue'

defineProps({
    title: {
        type: String,
        default: '弹窗标题'
    },
    param: {
        type: Object,
        default: () => {}
    }
})
</script>

<style lang="scss" scoped></style>
