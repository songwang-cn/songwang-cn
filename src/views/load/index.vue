<template>
  <div class="load">
    <div class="center">
      <img height="50px" src="@/assets/img/2.png" />
      <div class="progress">
        <div 
        :class="['bar', isloading && 'slow-add']" 
        :style="{
            width: progress + '%'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onUnmounted } from "vue"
import AppConfig from "@/config/appConfig"
import { showToast } from "vant"

const allWallPaper = import.meta.glob('../../assets/img/wallPaper/*.*', {eager: true})

function preLoadResource() {
  for(let key in allWallPaper){
    const img = new Image()
    img.src = allWallPaper[key].default
    img.onload = () => {
      console.log('加载成功')
    }
  }
}

preLoadResource()

const progress = ref(0)

let timer = null as any

const isloading = ref(false)

function initTimer() {
  isloading.value = true
  timer = setInterval(() => {
    if (progress.value >= 100) {
      clearTimer()
      AppConfig.router.push('/login')
    }else{
      progress.value+=.2
    }
  }, 10)
}

initTimer()

function clearTimer() {
  isloading.value = false
  clearInterval(timer)
  timer = null
}

onUnmounted(() => {
  clearTimer()
})




</script>

<style lang="scss" scoped>


.load{
    position: absolute;
    inset: 0;
    background-color: #000;

    .center{
      width: 50%;
      max-width: 300px;
      height: 80px;
      position: absolute;
      inset: 0;
      margin: auto;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .iconfont{
        font-size: 50px
      }

      .progress{
        height: 5px;
        width: 100%;
        background-color: #555;
        border-radius: 5px;
        position: relative;
        .bar{
          width: 0;
          inset: 0;
          position: absolute;
          background-color: #fff;
          border-radius:5px;

          &.slow-add{
            transition: 200ms;
          }
        }
      }
    }

    .load-finish{
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center center;
      .inner{
        width: 100%;
        height: 100%;
        animation: mask-in 500ms ease-in-out;
        background-color: rgba(0,0,0,.3);
        backdrop-filter: blur(5px);
        position: relative;
        animation: light-in 1000ms ease-in-out;

        @keyframes light-in{
          0%{
            background-color: rgba(0,0,0,.6);
          }
          100%{
            background-color: rgba(0,0,0,.3);
          }
        }

        .center{
          height:180px;
          animation: fade-scale-in 1000ms ease-in-out;
          .head{
            width: 90px;
            height: 90px;
            background-color:#fff;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #fff;
            box-shadow: 0 0 20px #ffffff;
          }
          .inp{
            display: flex;
            align-items: center;
            position: relative;
            :deep(.van-cell){
              background: rgba(255,255,255,.2);
              border-radius: 7px;
              font-size: 14px;
              position: relative;
              padding: 7px 20px;

              &::after{
                border: none;
              }
              
              .van-field__control{
                color: #fff;
              }
            }
            .login{
              width: 36px;
              height: 36px;
              position: absolute;
              right: -45px;
              background: rgba(255,255,255,.2);
              border-radius: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #a7a7a7;
              transition: 400ms;
              cursor: pointer;
              color: #cacaca;
              .iconfont{
                font-size: 12px;
                transform: scale(.8)
              }
              
              &:hover{
                color: #fff;
                background: rgba(255,255,255,.3);
              }
            }
          }

          @media screen and (max-width: 500px){
            .head{
              width: 80px;
              height: 80px;
            }
                    .inp{
                      .login{
                          width: 50px;
                          height: 50px;
                          position: absolute;
                          left: 0;
                          right: 0;
                          margin: 0 auto;
                          background-color: rgba(255,255,255,.2);
                          bottom: -100px;
                          color: #fff;
                      }
                  }
            }

          @keyframes fade-scale-in{
            0%{
              opacity: 0;
              transform: scale(.9);
            }
            100%{
              opacity: 1;
              transform: scale(1);
            }
          }
        }

        
        .action{
          width: 200px;
          position: absolute;
          bottom: 5%;
          left: 0;
          right: 0;
          margin: 0 auto;
          display: flex;
          justify-content:space-around;

          .item{
            height: 28px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size:13px;
            letter-spacing: 1px;
            color: #fff; 
            transition: 400ms;
            border-radius: 10px;
            cursor: pointer;
            transition: 400ms;
            overflow: hidden;
            .iconfont{
              font-size: 26px;
              padding: 5px 20px;
              animation: ring 5s linear infinite;
            }

            &:hover{
              background: rgba(255,255,255,.1);
              height: 60px;
              .iconfont{
                animation-play-state: running;
              } 
            }

            @keyframes ring{
              0%{
                transform: rotate(0deg);
              }
              100%{
                transform: rotate(180deg);
              }
            }
          }
         
        }
      }
    }
}
</style>
