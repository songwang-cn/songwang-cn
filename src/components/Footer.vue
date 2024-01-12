<template>
  <div class="footer">
    <div 
        class="item"
        v-for="item, index of appList" 
        @click="item.action && item.action()"  
    >
        <svg-icon :icon="item.icon" />
    </div>
 
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import { DialogHelper } from "@/helper/DialogHelper";
import SvgIcon from "./SvgIcon.vue";
import ConfigModal from "@/views/config/index.vue"

const jumpIndex = ref()

let timer: any = null

const appList = ref([
    {
        name: '微信',
        icon: 'icon-weixin1'
    },
    {
        name: 'Gitee',

        icon: 'icon-logo-gitee-g-red'
    },
    {
        name: '抖音',
        icon: 'icon-douyin',
        action: () => window.open('//www.douyin.com/', '_blank')

    }, 
    {
        name: '设置',
        icon: 'icon-shezhigengxin',
        action: () => DialogHelper.show(ConfigModal)
    },
  
])


</script>

<style lang="scss" scoped>
    .footer{
        width: 100%;
        height: 70px;
        display: inline-block;
        margin:0 auto;
        background-color: rgba($color: #fff, $alpha: 0.2);
        backdrop-filter: blur(3px);
        display: flex;
        padding: 5px 0;
        align-items: center;
        transition: 200ms;
        display: flex;
        justify-content: space-evenly;
        .item{
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }

</style>
