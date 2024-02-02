<template>
    <Dialog title="随机抽取">
        <div class="filter">
            <van-radio-group direction="horizontal" v-model="choseClass">
                <van-radio :name="7">七班</van-radio>
                <van-radio :name="8">八班</van-radio>
            </van-radio-group>
        </div>
        <div class="content">
            <div :style="{ animationDelay: index * 10 + 'ms' }"
                :class="['item_card', resultIndex.includes(index) ? 'isThis' : '']" v-for="item, index of excelJSON"
                :key="index">
                <span class="no">{{ item.no }}</span>
                {{ item.name }}
            </div>
        </div>
        <template #footer>
            <van-button type="primary" @click="onRandom" :loading="isRuning">
                开始随机<span v-if="isRuning">&nbsp;{{ Math.ceil(countDown - nowRandomPassedSecond / 1000) }}</span>
            </van-button>
            <van-button @click="stopRandom" v-if="isRuning">
                停止随机
            </van-button>
            <van-button type="danger" @click="onClean" v-if="!isRuning">
                清除结果
            </van-button>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue"
import { ref, watchEffect } from "vue"
import { class7List, class8List } from './list'

const visible = ref(false)

const map = {
    'no': '学号',
    'name': '姓名'
}

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

const resultIndex = ref([] as number[])

watchEffect(() => {
    excelJSON.value = choseClass.value === 7 ? class7List : class8List
    resultIndex.value = []
})

function classChange() {
    resultIndex.value = []
    let hasResultPanel = document.getElementById('result_panel')
    if (hasResultPanel) {
        document.body.removeChild(hasResultPanel)
    }
}



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
    div.style.background = '#fff'
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
    div.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)'
    div.innerText = result.map(v => v.name).join('，')
    document.body.appendChild(div)
}

const isRuning = ref(false)

const nowRandomTimer = ref(null as any)

const nowRandomPassedSecond = ref(0)

async function onRandom() {
    nowRandomPassedSecond.value = 0
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
    setTimeout(async () => {
        stopRandom()
    }, countDown.value * 1000)

}

function readName(name: string) {
    const speechUtterance = new SpeechSynthesisUtterance(name);
    speechUtterance.rate = 1; // 默认值为1，取值范围从0到2之间
    speechUtterance.pitch = 1; // 默认值为1，取值范围从0到2之间
    window.speechSynthesis.speak(speechUtterance);
}

function stopRandom() {
    if (!isRuning.value) return
    document.body.removeChild(document.getElementById('result_panel') as any)
    clearInterval(nowRandomTimer.value)
    isRuning.value = false
    const names = resultIndex.value.map(v => excelJSON.value[v]).map(v => v.name)
    setTimeout(() => {
        readName(names.join(','))
    }, 300)
}

function onClean() {
    resultIndex.value = []
}

</script>

<style lang="scss" scoped>
.app {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
}

.filter {
    padding: 10px;
}

.content {
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

.item_card {
    background-color: #007aff;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    text-align: center;
    transition: 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 19%;
    margin: 0 0 1% 1%;
    height: 60px;
    font-size: 16px;
    line-height: 15px;
    font-weight: 400;
    color: #ffffff;

    .no {
        position: absolute;
        font-weight: 300;
        top: 5px;
        left: 5px;
        font-size: 14px;
    }

}

.isThis {
    background-color: #ff8800;
    animation: jump 1s infinite;

    @keyframes jump {
        0% {
            transform: scale(0.8);
        }

        50% {
            transform: scale(0.9);
        }

        100% {
            transform: scale(0.8);
        }
    }
}
</style>
