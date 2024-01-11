<!--
 * @Author: songwang 112054945@qq.com
 * @Date: 2023-08-17 14:58:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-21 11:59:26
 * @FilePath: \VueJS\src\components\Experiences.vue
-->
<script lang="ts" setup>
import ExpItem from './ExpItem.vue'
</script>

<template>
  <ExpItem>
    <template #icon>
      <img src="@/assets/svg/IconDocumentation.svg" alt="">
    </template>
    <template #heading>Documentation</template>
    provides you with all information you need to get started.
  </ExpItem>

  <ExpItem>
    <template #icon>
      <img src="@/assets/svg/IconTooling.svg" alt="">
    </template>
    <template #heading>Tooling</template>
    This project is served and bundled with
  </ExpItem>

  <ExpItem>
    <template #icon>
      <img src="@/assets/svg/IconEcosystem.svg" alt="">
    </template>
    <template #heading>Ecosystem</template>
    Get official tools and libraries for your project:
  </ExpItem>

  <ExpItem>
    <template #icon>
      <img src="@/assets/svg/IconCommunity.svg" alt="">
    </template>
    <template #heading>Community</template>
    Got stuck? Ask your question on
  </ExpItem>

  <ExpItem>
    <template #icon>
      <img src="@/assets/svg/IconSupport.svg" alt="">
    </template>
    <template #heading>Support Vue</template>
    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
  </ExpItem>
</template>
