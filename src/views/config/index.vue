<template>
    <Dialog title="系统设置">
        <van-cell-group >
            <van-cell title="系统壁纸">
                <template #value>
                    <div 
                        class="item" 
                        :class="[appStore().bgUrl.indexOf(item.default) >= 0  && 'isThis']" 
                        v-for="item of allWallPaper"
                        @click="onChangeSystemBg(item)"
                    >
                        <img :src="(item as any).default" fit="cover"/>
                    </div>
                </template>
            </van-cell>
            <van-cell title="网络壁纸">
                <van-switch 
                    :active-value="BgType.RANDOM"
                    :inactive-value="BgType.SYSTEM" 
                    v-model="bgType" 
                    @change="bgTypeChange"
                />
            </van-cell>
            <van-cell title="深色主题">
                <van-switch 
                    active-value="dark"
                    inactive-value="light" 
                    v-model="theme" 
                    @change="themeChange"
                />
            </van-cell>
            <van-cell title="重新启动" is-link @click="AppConfig.router.push('/')"/>
        </van-cell-group>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Dialog from '@/components/Dialog.vue'
import { appStore } from '@/config/store'
import { Lazyload, showToast  } from 'vant';
import { UseRandomBg } from '@/use/UseRandomBg'
import { BgType } from '@/enum'
import AppConfig from '@/config/appConfig';

const allWallPaper = import.meta.glob('../../assets/img/wallPaper/*.*', {eager: true})

const bgType = ref(appStore().bgType)

async function bgTypeChange() {
    appStore().changeBgType(bgType.value as BgType)
    if(bgType.value === 'random') {
        UseRandomBg()
    }else{
        appStore().setBgUrl(appStore().lastBgUrl)
        showToast({
            message: '已切换为系统壁纸模式', 
            type: 'success'
        })
    }
}

const theme = ref(appStore().theme)

function themeChange() {
    appStore().changeTheme()
}

function onChangeSystemBg(item: any) {
    appStore().changeBgType(BgType.SYSTEM)
    bgType.value = BgType.SYSTEM
    try{
        appStore().setBgUrl(new URL(item.default, import.meta.url).href)
        showToast ({ 
            type: 'success', 
            className: 's-toast',
            message: '壁纸切换成功' 
        });
    }catch(e){
        console.log(e)
    }

}

</script>

<style lang="scss" scoped>
:deep(.van-cell){
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    .van-cell__title{
        flex: 0;
        min-width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    @media screen and (max-width: 501px) {
        .van-cell__value{
            white-space: nowrap;
            overflow: auto;
        }
    }
    
}

    .item{
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        overflow: hidden;
        cursor: pointer;
        margin: 5px;
        transition: 200ms all ease-in-out;
        &:hover{
            transform: scale(1.1);
        }
        img{
            width: 100%;
            height: 100%;
        }
    }

    .isThis{
        position: relative;
        &::after{
            content: '当前';
            color: #fff;
            font-size: 12px;
            line-height: 50px;
            text-align: center;
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.4);
        }
    }

    .s-toast{
        background: #fff !important;
    }
</style>
