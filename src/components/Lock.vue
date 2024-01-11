<template>
    <a-input class="input" v-model:value="key" />
</template>

<script lang="ts" setup>
import {ref} from "vue"

const key = ref('')
</script>

<style lang="scss" scoped>
.input{
    width: 300px;
}
</style>
