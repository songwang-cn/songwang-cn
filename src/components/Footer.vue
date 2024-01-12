<template>
    <div class="footer-box">
        <div class="footer">
            <div 
                class="item"
                v-for="item, index of appList" 
                @click="item.action && item.action()"  
            >
                <svg-icon :icon="item.icon" />
            </div>
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
.footer-box{
    width: 100%;
    position: absolute;
    z-index: 998;
    bottom: 0;
    display: flex;
}
    .footer{
        height: 70px;
        border-radius: 10px;
        display: inline-block;
        margin: 10px auto;
        background-color: rgba($color: #fff, $alpha: 0.2);
        backdrop-filter: blur(3px);
        display: flex;
        padding: 5px 20px;
        align-items: center;
        transition: 200ms;
        display: flex;
        justify-content: space-evenly;
        .item{
            width: 70px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            align-content: center;
            padding: 0 5px;
            transition: 200ms;
            &:hover{
                transform: scale3D(1.3, 1.3, 1.3);
                transform-origin: 50% 100%;
            }
        }
    }

    @media screen and (max-width: 478px) {
        .footer{
            width: 100%;
            border-radius: 0;
            overflow: hidden;
            padding: 5px 0;
            margin: 0;
            .item{
                width: 20%;
                &:hover{
                    transform: scale(1);
                }
            }
        }
        
    }

</style>
