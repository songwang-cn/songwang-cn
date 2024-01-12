<template>
    <Dialog title="系统设置">
        <van-cell-group>
            <van-cell title="更换壁纸">
                <template #value>
                    <div class="wallpaper">
                        <div class="item" :class="isThis" v-for="item of appStore().wallPaperList">
                            <van-image width="10rem" height="10rem" :src="item" fit="cover"/>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
    </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog.vue'
import { appStore } from '@/config/store'

</script>

<style lang="scss" scoped>
.wallpaper{
    display: flex;

    .item{
        width: 100px;
        height: 100px;
        border-radius: 100%;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid #f1f1f1;
    }
}
</style>
