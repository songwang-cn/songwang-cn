import { DialogHelper } from "@/helper/DialogHelper";
import Random from '@/views/random/index.vue';
import ConfigModal from "@/views/config/index.vue"
import Browser from '@/components/Browser.vue'

export var AllAppList = [
    {
        id: 1,
        name: '微信',
        icon: 'icon-weixin1',
        action: () => alert('微信')
    },
    {
        id: 2,
        name: 'Gitee',
        icon: 'icon-logo-gitee-g-red',
        action: () => {
            window.open('https://gitee.com/song-wang', '_blank')
        }
    },
    {
        id: 3,
        name: '点名',
        action: () => {
            DialogHelper.show(Random)
        }
    },
    {
        id: 7,
        name: '去听歌',
        action: () => {
            window.open('https://songwang-cn.gitee.io/music-player/#/', '_blank')
        }
    },
    {
        id: 4,
        name: '谷歌',
        icon: 'icon-Chrome',
        action: () => {
            window.open('https://www.baidu.com/', '_blank')
        }
    },
    {
        id: 5,
        name: '抖音',
        icon: 'icon-douyin',
        action: () => {
            window.open('//www.douyin.com/', '_blank')
        }

    }, 
    {
        id: 6,
        name: '设置',
        icon: 'icon-shezhigengxin',
        action: () => {
            DialogHelper.show(ConfigModal)
        }
    },
]

export var FooterAppList = [
    {
        id: 3,
        name: '点名',
        action: () => {
            DialogHelper.show(Random)
        }
    },
    {
        id: 4,
        name: '谷歌',
        icon: 'icon-Chrome',
        action: () => {
            window.open('https://www.baidu.com/', '_blank')
        }
    },
    {
        id: 5,
        name: '抖音',
        icon: 'icon-douyin',
        action: () => {
            DialogHelper.show(Browser, {
                url: 'https://www.php.cn/faq/536004.html'
            })
        }

    },
    {
        id: 6,
        name: '设置',
        icon: 'icon-shezhigengxin',
        action: () => {
            DialogHelper.show(ConfigModal)
        }
    },
]