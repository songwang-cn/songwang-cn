<template>
    <div 
        class="wrapper" 
        :style="{
            position: isOpen ? 'absolute' : 'static',
            zIndex: isOpen ? 2000 : 1000
        }"
        @click.self="emits('close')"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"

defineProps({
    isOpen: {
        type: Boolean,
        required: false,
    },
})

const emits = defineEmits(['close'])

</script>

<style lang="scss" scoped>
.wrapper{
    inset: 0;
    background: rgba(0,0,0,.5);
}
</style>
