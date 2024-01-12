<template>
    <div class="box" :style="{width: size, height: size}">
        <svg v-if="isSvg" :style="{width: size, height: size}" aria-hidden="true">
            <use :xlink:href="`#${icon}`"></use>
        </svg>
        <div class="un-svg" v-else>{{ name }}</div>
    </div>
    <div class="name" v-if="showName">{{ name }}</div>
</template>

<script lang="ts" setup>

const props = defineProps({
    icon: {
        type: String,
        default: ''
    },
    isSvg: {
        type: Boolean,
        default: true
    },
    name:{
        type: String,
        default: ''
    },
    size:{
        type: String,
        default: '65px'
    },
    showName:{
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
.box{
    margin: 0 auto;
    user-select: none;
    transition: 300ms all;
    cursor: pointer;
    &:active{
        transform: scale(0.9);
    }
}
.un-svg{
    width: 100%;
    height:100%;
    background-color: #111111;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    font-size: 17px;
    font-weight: bold;
}

.name{
    text-align: center;
    padding-top: 5px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    user-select: none;
}
</style>
