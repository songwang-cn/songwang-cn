<template>
    <div class="list">
        <div 
            :class="['card']" 
            v-for="card of list" 
            @click="card.action && card.action()"
        >
            <SvgIcon 
                :icon="card.icon" 
                :is-svg="card.isSvg" 
                :name="card.name"
                show-name
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import SvgIcon from './SvgIcon.vue';

defineProps({
    list: {
        type: Array<any>,
        default: () => []
    }
})

</script>

<style lang="scss" scoped>
 .list{
    flex: 1;
    padding-top: 40px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .card{
        width: 25%;
        transition: 300ms;
        padding: 10px 0;
    }
        .shake{
            animation: shake 0.2s infinite;
        }
   
           @keyframes shake {
             0% {
               transform: rotate(0deg);
             }
             50% {
               transform: rotate(5deg);
             }
             100% {
               transform: rotate(-5deg);
             }
           }
       }

       @media screen and (max-width: 501px) {
          .list{
            padding-top: 10px;
          }
       }
</style>
