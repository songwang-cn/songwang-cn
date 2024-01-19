<template>
    <div class="footer-box">
        <div class="footer">
            <div 
                class="item"
                v-for="card, index of AppConfig.footerAppList" 
            >
                <SvgIcon :config="card"/>
            </div>
            <i v-if="isPc && appStore().appPool.length" class="iconfont icon-PartingLine" style="color: #fff;font-size: 30px;"/>
            <div 
                v-if="isPc"
                class="item"
                v-for="card, index of appStore().appPool" 
            >
                <SvgIcon :config="card" jump-enable/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SvgIcon from "./SvgIcon.vue";
import { appStore } from "@/config/store";
import AppConfig from "@/config/appConfig";
import { UseIsPc } from "@/use/UseIsPc";

const { isPc } = UseIsPc();

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
        background-color: rgba($color: #aaa, $alpha: 0.6);
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

    @media screen and (max-width: 501px) {
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
