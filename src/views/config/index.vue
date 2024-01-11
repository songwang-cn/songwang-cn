<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-28 00:25:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-28 02:08:28
 * @FilePath: \Vue3vite\src\views\config\index.vue
-->
<template>
    <Dialog title="系统设置" width="500px" height="40%">
        <a-form>
          <a-form-item label="背景设置：">
            <a-select @click.stop v-model:value="bgType" @change="bgTypeChange">
                <a-select-option :value="BgType.MOVE">动态背景</a-select-option>
                <a-select-option :value="BgType.STATIC">背景图</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
    </Dialog>
</template>

<script lang="ts" setup>
import {ref, computed} from "vue"
import Dialog from '@/components/Dialog.vue'
import {DialogHelper} from '@/helper/DialogHelper'
import { appStore } from "@/config/store";
import { MenuType, BgType } from "@/enum";

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

</script>

<style lang="scss" scoped></style>
