<template>
    <div class="left" v-if="isNormalMenu">
        <div 
            class="menu_item" 
            v-for="route of AppConfig.router.getRoutes()" 
            @click="AppConfig.router.push(route.path)"
        >
          {{ route.meta.title }}
        </div>
    </div>
    <div 
        v-else
        :class="['menu_switch', active ? 'active' : 'un_active']" 
        ref="switchRef" 
        @click.stop.prevent="active = !active"
     >
        <span class="flag">
            <i :class="`iconfont ${active ? 'icon-zuojiantou' : 'icon-youjiantou'}`" />
        </span>
        <a-form>
          <a-form-item>
            <a-select @click.stop v-model:value="menuType" @change="menuTypeChange">
            <a-select-option :value="MenuType.NORMAL">默认</a-select-option>
            <a-select-option :value="MenuType.BUTTON">按钮</a-select-option>
        </a-select>
          </a-form-item>
          <a-form-item>
            <a-select @click.stop v-model:value="bgType" @change="bgTypeChange">
                <a-select-option :value="BgType.MOVE">动态背景</a-select-option>
                <a-select-option :value="BgType.STATIC">背景图</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
          </a-form-item>
        </a-form>

      
    


    </div>
  
</template>

<script lang="ts" setup>
import { appStore } from "@/config/store";
import { MenuType, BgType } from "@/enum";
import {SLoading} from "@/feedback/SLoading"
import {ref, computed} from "vue"
import AppConfig from '@/config/appConfig'

const isNormalMenu = computed(() => appStore().menuType === MenuType.NORMAL)

const active =  ref(false)

const menuType = ref(appStore().menuType)

const bgType = ref(appStore().bgType)

function menuTypeChange() {
  appStore().setMenuType(menuType.value)
}

function bgTypeChange() {
  appStore().setBgType(bgType.value)
}


const loading = ref(false)




</script>

<style lang="scss" scoped>
.left{
    min-width: 250px;
    height: 100%;
    background: rgba($color: #000, $alpha: 0.5);
    padding: 10px;
    margin-right: 5px;
    .menu_item{
        line-height: 60px;
        text-align: center;
        // background-color: #fff;
        cursor: pointer;
        &:hover{
            background-color: cadetblue;
        }
    }
}
.menu_switch{
    user-select: none;
    cursor: pointer;
    width: 300px;
    background-color: #fff;
    border-radius: 25px 0 0 25px;
    position: absolute;
    right: 0px;
    top: 50px;
    z-index: 1;
    transition: 300ms;
    display: flex;
    padding: 10px 0;
    justify-content: flex-start;
    align-items: center;
    &.active{
        right: 0;
        .flag{
            rotate: 180deg;
        }
    }
    &.un_active{
        right: -300px;
        .flag{
            rotate: -180deg;
        }
    }
    .flag{
        width: 50px;
        text-align: center;
        transition: 500ms;
        position: absolute;
        left: -50px;
    }
    // &:hover{
    //     left: 0;
    // }
   
    
}
</style>
