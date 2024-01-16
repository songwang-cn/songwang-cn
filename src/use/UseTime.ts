import  {ref} from 'vue'

export function UseTime() {
   
    const YY = ref(0)

    const MM = ref(0)

    const DD = ref(0)

    const HH = ref(0)

    const mm = ref(0)

    const ss = ref(0)

    const chineseWeekString = ['日', '一', '二', '三', '四', '五', '六']

    const WEEK = ref('') //星期几

    const leftString = ref('上午') //上午/下午

    function updateTime() {
        const date = new Date()

        YY.value = date.getFullYear()

        MM.value = date.getMonth() + 1

        DD.value = date.getDate()

        leftString.value = date.getHours() >= 12 ? '下午' : '上午'

        HH.value = date.getHours()

        mm.value = date.getMinutes()

        ss.value = date.getSeconds()

        WEEK.value = '星期'+ chineseWeekString[date.getDay()]
    }

    updateTime()

    setInterval(() => {
        updateTime()
    }, 1000)

    return {
        YY,
        MM,
        DD,
        HH,
        mm,
        ss: ss.value > 10 ? ss.value : '0'+ss.value,
        WEEK,
        leftString,
    }
}