
<template>
  <Dialog width="70%" height="70%" :title="param.title">
    <pre>
      {{contentText}}
    </pre>
  </Dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import Dialog from '@/components/Dialog.vue'

const props = defineProps({
    param: {
        type: Object,
        default: {}
    }
})

const contentText = ref('')

async function init() {
  const res = await fetch(props.param.path)
  contentText.value = await res.text()
}

init()

</script>

<style lang="scss" scoped>
pre{
  padding: 10px;
  white-space: pre-wrap;
}
</style>
