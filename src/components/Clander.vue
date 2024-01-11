<template>
    <Transition name="clander">
        <div class="clander_content" v-if="show">
        <div class="clander_top">
            <span @click="upMonth">
            <slot name="lastArrow">
                <span class="pre_month iconfont icon-arrow-left" />
            </slot>
            </span>
            <div style="text-align: center;flex: 1">
            {{ currentYear + '年' + currentMonth + '月' }}
            </div>
            <span @click="nextMonthClick">
            <slot name="nextArrow">
                <span class="next_month iconfont icon-arrow-right" />
            </slot>
            </span>
        </div>
        <div class="box" :style="{ width: clanderW + 'px', height: clanderW * 6 / 7 + 40 + 'px' }">
            <div class="day_item week">星期一</div>
            <div class="day_item week">星期二</div>
            <div class="day_item week">星期三</div>
            <div class="day_item week">星期四</div>
            <div class="day_item week">星期五</div>
            <div class="day_item week">星期六</div>
            <div class="day_item week">星期日</div>
            <template v-for="day of 42" :key="day">
            <div v-if="day > leftNum && day <= dayNum + leftNum"
                :class="['day_item', day - leftNum == new Date().getDate() && currentYear == new Date().getFullYear() && currentMonth == new Date().getMonth() + 1 ? 'today' : null]"
                @click="showItemDate(day - leftNum)">
                <span>
                <div>{{ day - leftNum }}</div>
                <!-- {{ currentYear }} {{ currentMonth }} -->
                <div>{{  String(new Lunar(new Date(`${currentYear}-${currentMonth}-${day - leftNum}`))).split('月')[1] }}</div>
                </span>
            </div>
            <!-- 上个月日期补齐 -->
            <div v-if="day <= leftNum" class="day_item last" @click="showLastItemDate(lastMonthDayNum + (day - leftNum))">
                <span>
                    <div>{{ lastMonthDayNum + (day - leftNum) }}</div>
                    <div>{{  String(new Lunar(new Date(`${currentYear}-${currentMonth-1}-${lastMonthDayNum + (day - leftNum)}`))).split('月')[1] }}</div>
                </span>
            </div>
            <!-- 下个月日期补齐 -->
            <div v-if="day > dayNum + leftNum" class="day_item last" @click="showNextItemDate((day - leftNum) - dayNum)">
                <span>
                    <div>{{ (day - leftNum) - dayNum }}</div>
                    <div>{{  String(new Lunar(new Date(`${currentYear}-${currentMonth+1}-${(day - leftNum) - dayNum}`))).split('月')[1] }}</div>
                </span>
            </div>
            </template>
        </div>
    </div>
    </Transition>
</template>
    
<script lang="ts" setup>
import { SMessage } from '@/feedback/SMessage';
import { ref, defineProps, onMounted, nextTick, computed } from 'vue'
import Lunar from 'lunar'

const show = ref(false)

onMounted(() => {
  console.log(String(new Lunar(new Date('2023-10-1'))))
    show.value = true
    document.addEventListener('mousedown', (e) => {
      if(!(e.target as HTMLElement).className.includes('clander_content') && 
         !(e.target as HTMLElement).className.includes('day_item') &&
         !(e.target as HTMLElement).className.includes('pre_month') && 
         !(e.target as HTMLElement).className.includes('next_month') && 
         !(e.target as HTMLElement).className.includes('clander_top'))
        {
            show.value = false
            setTimeout(() => {
                props.destory()
            }, 100)
        }
    }, true)
})
  
  const props = defineProps({
    /*
     @desc 头部控件的位置
    */
    topPosition: {
      type: String,
      default: 'left' //'left' | 'center' | 'right'
    },
    width: {
      type: Number,
      default: 260
    },
    destory: {
        type: Function,
        default: () => {}
    }
  })

  const clanderW = computed(() => props.width > 260 ? props.width : 260)
  
  //   const topFlexMode = computed(() => {
  //     return props.topPosition === 'left' ? 
  //   })
  
  const dayNum = ref(31)
  
  const currentYear = ref(new Date().getFullYear())
  const currentMonth = ref(new Date().getMonth() + 1)
  
  const leftNum = ref(0)
  
  const rightNum = ref(0)
  
  const getCurrentMonthFirstDayWeekNo = () => {
    const no = new Date(`${currentYear.value}-${currentMonth.value}-1`).getDay()
    if (no > 0) {
      leftNum.value = no - 1
    } else {
      leftNum.value = 6
    }
    console.log(leftNum.value)
  }
  
  const getCurrentMonthLastDayWeekNo = () => {
    const no = new Date(`${currentYear.value}-${currentMonth.value}-${dayNum.value}`).getDay()
    rightNum.value = 7 - no
    console.log(rightNum.value)
  }
  
  const initDayNum = () => {
    dayNum.value = new Date(Number(currentYear.value), Number(currentMonth.value), 0).getDate()
    console.log('dayNum', dayNum.value)
    getCurrentMonthFirstDayWeekNo()
    getCurrentMonthLastDayWeekNo()
    getLastMonthDayNum()
    getNextMonthDayNum()
  }
  
  
  const lastMonthDayNum = ref(0)
  const lastMonth = ref(0)
  const lastMonthYear = ref(0)
  const getLastMonthDayNum = () => {
    lastMonth.value = currentMonth.value > 1 ? currentMonth.value - 1 : 12
    lastMonthYear.value = currentMonth.value > 1 ? currentYear.value : currentYear.value - 1
    lastMonthDayNum.value = new Date(Number(lastMonthYear.value), Number(lastMonth.value), 0).getDate()
    console.log('lastMonthDayNum', lastMonthDayNum.value)
  }
  
  const nextMonthDayNum = ref(0)
  const nextMonth = ref(0)
  const nextMonthYear = ref(0)
  const getNextMonthDayNum = () => {
    nextMonth.value = currentMonth.value < 12 ? currentMonth.value + 1 : 1
    nextMonthYear.value = currentMonth.value < 12 ? currentYear.value : currentYear.value + 1
    nextMonthDayNum.value = new Date(Number(nextMonthYear.value), Number(nextMonth.value), 0).getDate()
    console.log('lastMonthDayNum', nextMonthDayNum.value)
  }
  
  initDayNum()
  
  const upMonth = () => {
    if (currentMonth.value > 1) {
      currentMonth.value = currentMonth.value - 1
    } else {
      currentMonth.value = 12
      currentYear.value = currentYear.value - 1
    }
    initDayNum()
  }
  
  const nextMonthClick = () => {
    if (currentMonth.value < 12) {
      currentMonth.value = currentMonth.value + 1
    } else {
      currentMonth.value = 1
      currentYear.value = currentYear.value + 1
    }
    initDayNum()
  }
  
  const showItemDate = (day: number) => {
    SMessage.info(`${currentYear.value}-${currentMonth.value}-${day}`)
  }
  
  const showLastItemDate = (day: number) => {
    SMessage.info(`${lastMonthYear.value}-${lastMonth.value}-${day}`)
  }
  
  const showNextItemDate = (day: number) => {
    SMessage.info(`${nextMonthYear.value}-${nextMonth.value}-${day}`)
  }
  </script>
    
  <style scoped lang="scss">

  .clander-enter-active{
    transform: scale(1);
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
  .clander-enter-from,.clander-leave-to{
    transform: scale(0.2);
    opacity: 0;
    transform: translateX(20px) translateY(-20px);
  }
  .clander_content{
    user-select: none;
    padding: 10px;
    background-color: rgba($color: (#fff), $alpha: 0.7);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    transition: 120ms;
    box-shadow: 0 0 20px #7c7c7c;
    transform-origin: 100% 0;
  }
  .clander_top {
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pre_month, .next_month{
      padding: 0 10px;
        color: #000000;
        border-radius: 5px;
        font-size: 12px;
        cursor: pointer;
        transition: 200ms;
        &:hover{
            color: #fff;
        }
    }
  }
  
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    // box-shadow: 0 0 1px #000;
  }
  
  .day_item {
    flex: 0 0 14.2857%;
    max-width: 14.2857%;
    height: 14%;
    box-sizing: border-box;
    padding: 5px;
    // box-shadow: 0 0 1px #000;
    cursor: pointer;
  
    span {
      display: inline-block;
      color: #000;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      border-radius: 20px;
    }
  
    &:hover {
      background: #ffac6e;
    }
  }
  
  .today {
    background: #7e7e7e;
    span{
        color: #fff !important;
    }
  }
  
  .week {
    font-weight: 400;
    white-space: nowrap;
    padding: 0;
    text-align: center;
    color: #7c7c7c;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
  }
  
  .last {
    opacity: 0.3;
  }

  

  @media screen and (max-width: 768px) {
    .clander_content {
      background-color: #000;
    }

    .today{
      background: rgb(255, 174, 0);
    }
    .day_item{
      span{
        color: #fff;
      }
    }

    .week{
      color: #fff
    }

    .clander_top {
      color: #fff;
      .pre_month, .next_month{
        color: #fff
      }
    }
  }
  </style>
    