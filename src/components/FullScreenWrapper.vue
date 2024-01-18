<template>
    <div 
        class="wrapper" 
        :style="{
            position: isOpen ? 'absolute' : 'static',
            zIndex: isOpen ? 2000 : 1000,
            background: showBg ? 'rgba(0,0,0,.5)' : 'none'
        }"
        @mousedown.self="onMousedown"
        @mouseup.self="onMouseUp"
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
    showBg:{
        type:Boolean,
        default: true
    }
})

const startTime = ref(0)

function onMousedown() {
    startTime.value = Date.now()
}

function onMouseUp() {
    if(Date.now() - startTime.value <= 300) {
        emits('close')
    }
}

const emits = defineEmits(['close'])

</script>

<style lang="scss" scoped>
.wrapper{
    inset: 0;
}
</style>
