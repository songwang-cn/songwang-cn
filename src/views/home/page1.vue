<template>
    <AppTable :list="appList" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DialogHelper } from '@/helper/DialogHelper';
import Random from '@/views/random/index.vue';
import AppTable from '@/components/AppTable.vue';

const appList = ref([
    {
        name: '微信',
        icon: 'icon-weixin1',
        action: () => alert('微信')
    },
    {
        name: 'Gitee',
        icon: 'icon-logo-gitee-g-red',
        action: () => window.open('https://gitee.com/song-wang', '_blank')
    },
    {
        name: '点名',
        isSvg: false,
        action: () => DialogHelper.show(Random)
    }
])
</script>
