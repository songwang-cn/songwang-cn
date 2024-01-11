<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-09-07 10:27:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-20 09:56:26
 * @FilePath: \Vue3vite\src\views\random\index.vue
-->
<template>
    <Panel>
        <template #body>
            <div class="top">
                <div class="filter-item">  
                    班级：
                    <a-select :disabled="isRuning" style="width: 150px;" v-model:value="choseClass" @change="classChange">
                        <a-select-option :value="7">七班</a-select-option>
                        <a-select-option :value="8">八班</a-select-option>
                    </a-select>
                </div>
                <div class="filter-item">
                    倒计时长：
                    <a-select :disabled="isRuning" style="width: 150px;" v-model:value="countDown">
                        <a-select-option :value="5">5秒</a-select-option>
                        <a-select-option :value="10">10秒</a-select-option>
                        <a-select-option :value="20">20秒</a-select-option>
                        <a-select-option :value="30">20秒</a-select-option>
                        <a-select-option :value="60">1分钟</a-select-option>
                    </a-select>
                </div>
                <div class="filter-item">
                抽取个数：
                <a-input-number type="number" :min="1" :max="3" :disabled="isRuning" style="width: 150px;"
                    v-model:value="count" />
                </div>
                <div class="filter-item">
                随机速度：
                <a-select :disabled="isRuning" style="width: 150px;" v-model:value="randomSpeed">
                    <a-select-option :value="100">10次/s</a-select-option>
                    <a-select-option :value="20">50次/s</a-select-option>
                    <a-select-option :value="10">100次/s</a-select-option>
                </a-select>
                </div>
                <a-button @click="onRandom" :loading="isRuning">
                    开始随机
                </a-button>
                <a-button @click="stopRandom" :disabled="!isRuning">
                    停止随机
                </a-button>
                <a-button @click="onClean" :disabled="isRuning">
                    清除结果
                </a-button>
                &nbsp;&nbsp;
                <span v-if="isRuning">
                    倒计时：{{ Math.ceil(countDown - nowRandomPassedSecond / 1000) }}
                </span>
            </div>
            <div class="app">
                <a-popover color="#000" placement="bottomLeft" v-model:open="visible" trigger="click">
                    <template #content>
                        <div class="filter-item">  
                        选择班级：
                        <a-select :disabled="isRuning" style="width: 150px;" v-model:value="choseClass" @change="classChange">
                            <a-select-option :value="7">七班</a-select-option>
                            <a-select-option :value="8">八班</a-select-option>
                        </a-select>
                    </div>
                    <div class="filter-item">
                        倒计时长：
                        <a-select :disabled="isRuning" style="width: 150px;" v-model:value="countDown">
                            <a-select-option :value="5">5秒</a-select-option>
                            <a-select-option :value="10">10秒</a-select-option>
                            <a-select-option :value="20">20秒</a-select-option>
                            <a-select-option :value="30">20秒</a-select-option>
                            <a-select-option :value="60">1分钟</a-select-option>
                        </a-select>
                    </div>
                    <div class="filter-item">
                    抽取个数：
                    <a-input-number type="number" :min="1" :max="3" :disabled="isRuning" style="width: 150px;"
                        v-model:value="count" />
                    </div>
                    <div class="filter-item">
                    随机速度：
                    <a-select :disabled="isRuning" style="width: 150px;" v-model:value="randomSpeed">
                        <a-select-option :value="100">10次/s</a-select-option>
                        <a-select-option :value="20">50次/s</a-select-option>
                        <a-select-option :value="10">100次/s</a-select-option>
                    </a-select>
                    </div>
                    </template>
                    <MenuOutlined style="color: #fff;font-size: 30px;"/>
                </a-popover>
                
                <a-button @click="onRandom" :loading="isRuning">
                    开始随机<span v-if="isRuning">&nbsp;{{ Math.ceil(countDown - nowRandomPassedSecond / 1000) }}</span>
                </a-button>
                <a-button @click="stopRandom" v-if="isRuning">
                    停止随机
                </a-button>
                <a-button @click="onClean" v-if="!isRuning">
                    清除结果
                </a-button>
            </div>
            <div class="content">
                <div :ref="el => itemRef[index] = el" :style="{ animationDelay: index * 10 + 'ms' }"
                    :class="['item_card', resultIndex.includes(index) ? 'isThis' : '']" v-for="item, index of excelJSON">
                    <span class="no">{{ item.no }}</span>
                    {{ item.name }}
                </div>
            </div>
        </template>
    </Panel>
</template>

<script lang="ts" setup>
import { ref, watchEffect, onMounted } from "vue"
import Panel from "@/components/Panel.vue"
import { class7List, class8List } from './list'
import Result from "./result.vue"
import { DialogHelper } from "@/helper/DialogHelper"
import gsap from "gsap"
import {
    MenuOutlined
} from '@ant-design/icons-vue';

const visible = ref(false)

const map = {
    'no': '学号',
    'name': '姓名'
}

const itemRef = ref<any[]>([])

const choseClass = ref(7)

const fileList = ref([]);

const excelJSON = ref<any[]>([])

const columns = ref([])

const randomTimer = ref(null)

const countDown = ref(5)

const count = ref(1)

const randomSpeed = ref(100)

function removeFile(index: number) {
    fileList.value.splice(index, 1)
    excelJSON.value = []
}

watchEffect(() => {
    excelJSON.value = choseClass.value === 7 ? class7List : class8List
})

function classChange() {
    resultIndex.value = []
    let hasResultPanel = document.getElementById('result_panel')
    if (hasResultPanel) {
        document.body.removeChild(hasResultPanel)
    }
}


const resultIndex = ref([] as number[])

function getRandomNumber(): number[] {
    let arr = [] as number[]
    for (let i = 0; i < count.value; i++) {
        let random = Math.floor(Math.random() * excelJSON.value.length)
        arr.push(random)
    }
    return arr
}

function ininResultPanel() {
    let result = resultIndex.value.map(v => excelJSON.value[v])
    const div = document.getElementById('result_panel') || document.createElement('div')
    div.setAttribute('id', 'result_panel')
    div.style.position = 'absolute'
    div.style.height = '100px'
    div.style.width = 200 + 100 * count.value + 'px'
    div.style.maxWidth = '800px'
    div.style.background = 'rgba(255,255,255,0.8)'
    div.style.borderRadius = '20px'
    div.style.lineHeight = '50px'
    div.style.inset = '0'
    div.style.margin = 'auto'
    div.style.display = 'flex'
    div.style.flexDirection = 'column'
    div.style.alignItems = 'center'
    div.style.justifyContent = 'center'
    div.style.fontSize = '30px'
    div.style.fontWeight = 'bold'
    div.style.color = '#000'
    div.style.zIndex = '99'
    div.style.textAlign = 'center'
    div.innerText = result.map(v => v.name).join('，')
    document.body.appendChild(div)
}

const isRuning = ref(false)

const nowRandomTimer = ref(null as any)

const nowRandomPassedSecond = ref(0)

async function onRandom() {
    gsap.to(".item_card", {
        y: 0,
        scale: 0.95,
        yoyo: true,
        repeat: 0,
        ease: "power1.inOut",
        delay: 0,
        stagger: {
            amount: 0.1,
            grid: "auto",
            from: [2, 6],
        },
    }).then(() => {
        nowRandomPassedSecond.value = 0
        // if(!fileList.value.length || !excelJSON.value.length) {
        //     return SMessage.error('请先导入excel文件')
        // }
        let hasResultPanel = document.getElementById('result_panel')
        if (hasResultPanel) {
            document.body.removeChild(hasResultPanel)
        }
        isRuning.value = true
        nowRandomTimer.value = setInterval(() => {
            resultIndex.value = getRandomNumber()
            excelJSON.value.sort(() => 0.5 - Math.random())
            ininResultPanel()
            nowRandomPassedSecond.value += randomSpeed.value
        }, randomSpeed.value)
        // await UseCountDown(countDown.value, 'transparent')
        setTimeout(async () => {
            stopRandom()
        }, countDown.value * 1000)
    })
}

function stopRandom() {
    if (!isRuning.value) return
    clearInterval(nowRandomTimer.value)
    isRuning.value = false
    showResult()
}

function onClean() {
    resultIndex.value = []
    gsap.to(".item_card", {
        y: 0,
        scale: 0.95,
        yoyo: true,
        repeat: 0,
        ease: "power1.inOut",
        delay: 0,
        stagger: {
            amount: 1,
            grid: "auto",
            from: [2, 6],
        },
    })
}

async function showResult() {
    let hasResultPanel = document.getElementById('result_panel')
    if (hasResultPanel) {
        document.body.removeChild(hasResultPanel)
    }
    gsap.to(".item_card", {
        y: -800,
        scale: 0.1,
        yoyo: true,
        repeat: 0,
        ease: "power1.inOut",
        delay: 0,
        stagger: {
            amount: 1.6,
            grid: "auto",
            from: [2, 6],
        },
    })

    // await DialogHelper.show(Result, resultIndex.value.map(v => excelJSON.value[v]))
    // onRandom()
}


// function initColumns() {
//     if(excelJSON.value.length) {
//         const keys = Object.keys(excelJSON.value[0])
//         const columnsArr = keys.map(item => {
//             return {
//                 title: item,
//                 dataIndex: item,
//                 key: item
//             }
//         })
//         columns.value = columnsArr
//     }
// }

// function beforeUpload(file: File) {
//     console.log('beforeUpload', file)
//       // 错误情况判断
//       if (!file) {
//         return false
//       } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
//         SMessage.error('上传格式不正确，请上传xls或者xlsx格式')
//         return false
//       }
//       const fileReader = new FileReader()// 读取文件
//       fileReader.onload = (ev: any) => {
//         try {
//           const data = ev.target.result// 获取结果
//           // 获取所有表的信息
//           const workbook = read(data, {
//             type: 'binary', // 以字符编码的方式解析
//             cellDates: true// 将excel中日期类型数据，转化为标准日期格式，而不是默认的数字格式
//           })
//           // 获取第一张表的表名
//           const exlname = workbook.SheetNames[0]
//           // 转换成json数据
//           const exl = utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
//           // 打印 ws 就可以看到读取出的表格数据
//           console.log(exl)

//           excelJSON.value = exl

//           initColumns()
//           // 数据处理
//         //   this.submit_from(exl)
//         } catch (e) {
//           console.log('error')
//           return false
//         }
//       }
//       fileReader.readAsBinaryString(file)

// }
</script>

<style lang="scss" scoped>
.top {
    padding: 15px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    background-color: rgba($color: #fff, $alpha: 0.8);
    backdrop-filter: blur(10px);
 
    .filter-item{
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-right: 20px;
    }
}

.content {
    padding: 0px;
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

.item_card {
    width: 10%;
    height: 160px;
    transform: scale(0.95);
    background-color: rgba($color: #000000, $alpha: 0.4);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    text-align: center;
    color: #fff;
    transition: 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;

    .no {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 14px;
        font-weight: 300;
    }
}

.app{
    display: none;;
}



@media screen and (max-width: 768px) {
    .top{
       display: none;
    }

    .app{
        display: flex;
        align-items: center;
        padding-bottom: 15px;
    }
    .filter-item{
            padding-bottom: 10px;
            color: #fff;
        }
    .item_card{
        width: 20%;
        height: 60px;
        font-size: 16px;
        line-height: 15px;
        font-weight: 400;
        background-color: #fff;
        color: #555555;
        .no {
            top: 5px;
            left: 5px;
            font-size: 14px;
        }
    }
    .isThis{
        color: #fff;
    }
}

.isThis {
    background-color: rgb(69, 165, 255);
    z-index: 98;
    animation: ani 800ms infinite;

    @keyframes ani {
        0% {
            transform: scale(0.95);
        }

        50% {
            transform: scale(1);
        }

        100% {
            transform: scale(0.95);
        }
    }
}
</style>
