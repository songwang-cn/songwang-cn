<template>
    <Dialog title="系统设置">
        <van-cell-group>
            <van-cell title="更换壁纸">
                <template #value>
                    <div 
                        class="item" 
                        :class="[appStore().bgUrl.indexOf(item.default) >= 0  && 'isThis']" 
                        v-for="item of allWallPaper"
                        @click="onChange(item)"
                    >
                        <van-image width="100%" height="100%" :src="(item as any).default" fit="cover"/>
                    </div>
                </template>
            </van-cell>
            <van-cell title="深色主题">
                <van-switch 
                    active-value="dark"
                    inactive-value="light" 
                    v-model="theme" 
                    @change="themeChange"
                />
            </van-cell>
        </van-cell-group>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Dialog from '@/components/Dialog.vue'
import { appStore } from '@/config/store'
import { showToast  } from 'vant';

const theme = ref(appStore().theme)

function themeChange() {
    appStore().changeTheme()
}

const allWallPaper = import.meta.glob('../../assets/img/wallPaper/*.*', {eager: true})


function onChange(item: any) {
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
    .van-cell__title{
        flex: 0;
        min-width: 20%;
        display: flex;
        align-items: center;
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
    }

    .isThis{
        box-shadow: 0 0 0 3px #f59300;
        position: relative;
        &::after{
            content: '当前';
            color: #fff;
            font-size: 14px;
            line-height: 50px;
            text-align: center;
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.3);
        }
    }

    .s-toast{
        background: #fff !important;
    }
</style>
