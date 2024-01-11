<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-26 18:50:41
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-26 20:07:36
 * @FilePath: \VueJS\src\components\SvgIcon.vue
-->
<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#${icon}`"></use>
    </svg>
</template>

<script lang="ts" setup>

const props = defineProps({
    icon: {
        type: String,
        default: ''
    },
})
</script>

<style type="text/css">
.icon{
    width: 40px; 
    height: 40px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    transition: 200ms;

}
</style>
