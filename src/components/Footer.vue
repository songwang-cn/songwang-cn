<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-25 11:59:56
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-15 16:54:12
 * @FilePath: \Vue3vite\src\components\Footer.vue
-->
<template>
  <div class="footer">
    <div class="footer_content">
        <div :class="['footer_item', jumpIndex === index ? 'click' : '']" 
          @click="item.action && item.action()"
          v-for="item, index of appList"
        >
            <svg-icon :icon="item.icon" />
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import AppDialog from "@/views/AppDialog/index.vue";
import { DialogHelper } from "@/helper/DialogHelper";
import UseConfigPanel from '@/use/UseConfigPanel';
import SvgIcon from "./SvgIcon.vue";

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
        icon: 'icon-douyin'

    }, 
    {
        name: '设置',
        icon: 'icon-shezhigengxin',
        action: () => {
            UseConfigPanel()
        }
    },
  
])

async function setJump(appInfo: any, index: number) {
    if(timer){
        clearTimeout(timer)
    } 
    jumpIndex.value = index
    timer = setTimeout(() => {
        jumpIndex.value = null
    }, 3000)
    await DialogHelper.show(AppDialog, appInfo)
}


</script>

<style lang="scss" scoped>

.footer{
    width: 100%;
    // position: absolute;
    // bottom: 10px;
    display: flex;
    justify-content: space-evenly;
    padding: 5px;
    .footer_content{
        height: 60px;
        border-radius: 15px;
        display: inline-block;
        margin:0 auto;
        background-color: rgba($color: #fff, $alpha: 0.2);
        backdrop-filter: blur(3px);
        display: flex;
        padding: 10px 20px;
        align-items: center;
        transition: 200ms;
        .footer_item{
            cursor: pointer;
            padding: 5px;

            :deep(.icon){
                &:hover{
                    width: 60px;
                    transform: scale(1.8);
                    transform-origin: 50% 100%;
                }
            }
            &.click{
                animation: jump 1s ease-in-out infinite;
            }

            @keyframes jump {
                0% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-20px);
                }
                100% {
                    transform: translateY(0px);
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .footer{
        display: none;
    }
}
</style>
