<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 13:24:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-26 17:24:37
 * @FilePath: \VueJS\src\components\StarBg.vue
-->
<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-23 13:24:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-23 16:42:55
 * @FilePath: \VueJS\src\components\Body.vue
-->
<template>
    <div class="sass-star">
        <div class="layer1"/>
        <div class="layer2"/>
        <div class="layer3"/>
        <div class="layer4"/>
        <div class="layer5"/>
        <div class="layer6"/>
    </div>
</template>
  
<style lang="scss" scoped>
  
  @function getShadow($num) {
    $shadow: '10vw 10vh #fff';
    @for $i from 1 through $num {
        $shadow: unquote($shadow) + ',#{random(100)}vw #{random(100)}vh #fff';
    }
    @return $shadow;
  }
  
  $width: 100vw;
  $height: 100vh;
  .sass-star {
    height: $height;
    width: $width;
    background-color: rgba(23, 25, 58, 0.9);
    position: relative;
    overflow: hidden;
  
    @for $i from 1 through 3 {
        $size: unquote('#{$i*0.2 + 1}px');
        $duration: unquote('#{calc(200 / $i)}s');
        $shadowNum: ($i % 2 + 1) * 200;
        .layer#{$i} {
            position: absolute;
            top: 0;
            left: 0;
            height: $size;
            width: $size;
            border-radius: 100%;
            box-shadow: getShadow($shadowNum);
            animation: moveUp $duration infinite linear;
            &::after{
                content: '';
                position: fixed;
                top: 100vh;
                left: 0;
                height: $size;
                width: $size;
                border-radius: inherit;
                box-shadow: inherit;
            }
        }
    }
  }
  
  @keyframes moveUp {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-100vh);
    }   
  }
    
  </style>
  