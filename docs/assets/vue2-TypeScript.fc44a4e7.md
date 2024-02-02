## ts在vue2.0中实战

### 构建
通过官方脚手架构建安装
```
# 1. 如果没有安装 Vue CLI 就先安装
npm install --global @vue/cli
```

最新的Vue CLI工具可以直接使用 TypeScript 集成环境 创建新项目。
运行vue create vue-ts
然后，命令行会要求选择预设。使用箭头键选择 Manually select features。
确保选择了 TypeScript 和 Babel 选项
![1.png](https://upload-images.jianshu.io/upload_images/18025218-8f8594d9cce1c00d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后配置其余设置
![2.png](https://upload-images.jianshu.io/upload_images/18025218-206cd932ae10dcda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

设置完成 vue cli 就会开始安装依赖。

### 目录解析
安装完成打开项目,集成 ts 后的项目目录结构是这样子的：


```js
|-- vue-ts
    |-- .browserslistrc     # browserslistrc 配置文件 (用于支持 Autoprefixer)
    |-- .eslintrc.js        # eslint 配置
    |-- .gitignore
    |-- babel.config.js     # babel-loader 配置
    |-- package-lock.json
    |-- package.json        # package.json 依赖
    |-- postcss.config.js   # postcss 配置
    |-- README.md
    |-- tsconfig.json       # typescript 配置
    |-- vue.config.js       # vue-cli 配置
    |-- public              # 静态资源 (会被直接复制)
    |   |-- favicon.ico     # favicon图标
    |   |-- index.html      # html模板
    |-- src
    |   |-- App.vue         # 入口页面
    |   |-- main.ts         # 入口文件 加载组件 初始化等
    |   |-- shims-tsx.d.ts  # 允许.tsx 结尾的文件，在 Vue 项目中编写 jsx 代码
    |   |-- shims-vue.d.ts  # 主要用于 TypeScript 识别.vue 文件，Ts 默认并不支持导入 vue 文件
    |   |-- assets          # 主题 字体等静态资源 (由 webpack 处理加载)
    |   |-- components      # 全局组件
    |   |-- router          # 路由
    |   |-- store           # 全局 vuex store
    |   |-- styles          # 全局样式
    |   |-- views           # 所有页面
    |-- tests               # 测试
```
与之前用js构建的项目目录没有什么太大的不同，区别主要是之前 js 后缀的现在改为了ts后缀，还多了tsconfig.json、shims-tsx.d.ts、shims-vue.d.ts这几个文件
+ tsconfig.json: typescript配置文件,主要用于指定待编译的文件和定义编译选项

+ shims-tsx.d.ts: 允许.tsx 结尾的文件，在 Vue 项目中编写 jsx 代码

+ shims-vue.d.ts: 主要用于 TypeScript 识别.vue 文件，Ts 默认并不支持导入 vue 文件
### 使用

在 vue 中使用 typescript 非常好用的几个库

+ vue-class-component: vue-class-component是一个 Class Decorator,也就是类的装饰器

+ vue-property-decorator: vue-property-decorator是基于 vue 组织里 vue-class-component 所做的拓展import { Vue, Component, Inject, Provide, Prop, Model, Watch, Emit, Mixins } from 'vue-property-decorator'

+ vuex-module-decorators: 用 typescript 写 vuex 很好用的一个库import { Module, VuexModule, Mutation, Action, MutationAction, getModule } from 'vuex-module-decorators'

### 组件声明
```tsx
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Test extends Vue {

}
```
### data 对象
```tsx
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
   private name = "";
}
```
### Prop 声明

```tsx
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  @Prop({ default: false }) private isCollapse!: boolean;
  @Prop({ default: true }) private isFirstLevel!: boolean;
  @Prop({ default: "" }) private basePath!: string;
  private name = "";
}

```

+ !: 表示一定存在，?: 表示可能不存在。这两种在语法上叫赋值断言
+ @Prop(options: (PropOptions | Constructor[] | Constructor) = {})
  + PropOptions，可以使用以下选项：type，default，required，validator
  + Constructor[]，指定 prop 的可选类型
  + Constructor，例如 String，Number，Boolean 等，指定 prop 的类型

### method
js 下是需要在 method 对象中声明方法，现在变成
```tsx
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  @Prop({ default: false }) private isCollapse!: boolean;
  @Prop({ default: true }) private isFirstLevel!: boolean;
  @Prop({ default: "" }) private basePath!: string;
  private name = "";

  public clickFunc(): void {
    console.log(this.isCollapse);
    console.log(this.basePath);
  }
}

```
### Watch 监听属性
```tsx
 @Watch("name", { immediate: true })
  private onNameChange(name: string) {
    console.log(name);
  }
```
+ @Watch(path: string, options: WatchOptions = {})
  + options 包含两个属性 
    1.  immediate?:boolean 侦听开始之后是否立即调用该回调函数 
    2. deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数


```tsx
@Watch('arr', { immediate: true, deep: true })
 private  onArrChanged(newValue: number[], oldValue: number[]) {}
```
### computed 计算属性
```tsx
public get allname() {
  return 'computed ' + this.name;
}
```
allname 是计算后的值，name 是被监听的值

### 生命周期函数
```tsx
  public created(): void {
    console.log("created");
  }

  public mounted(): void {
    console.log("mounted");
  }
```
### emit 事件
```tsx
 @Emit()
  getName() {
    return this.name;
  }

  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20);
      }, 0);
    });
  }
```
使用 js 写法

```js
  getName() {
      this.$emit('get-name',  this.name)
   }
  promise() {
      const promise = new Promise(resolve => {
          setTimeout(() => {
          resolve(20)
          }, 0)
      })
      promise.then(value => {
          this.$emit('promise', value)
      })
   }
```
+  @Emit(event?: string)
+  @Emit 装饰器接收一个可选参数，该参数是emit的第一个参数，充当事件名。如果没有提供这个参数
Emit 会将回调函数名的 camelCase 转为 kebab-case，并将其作为事件名
+  @Emit 会将回调函数的返回值作为第二个参数，如果返回值是一个 Promise 对象，$emit 会在 Promise 对象被标记为 resolved 之后触发
+ @Emit 的回调函数的参数，会放在其返回值之后，一起被$emit 当做参数使用

### vuex
传统的 store 用法
```js
export default  {
    namespaced:true,
    state:{
        foo:""
    },
    getters:{
        getFoo(state){ return state.foo}
    },
    mutations:{
        CHANGE_FOO(state,payload){
            state.foo = payload
        }
    },
    actions:{
        changeFoo({commit},payload){
            commot("getFoo",payload)
        }
    }
}
```
vuex-module-decorators的使用方法
```tsx
// store/test.ts

import {
    VuexModule,
    Mutation,
    Action,
    getModule,
    Module
  } from "vuex-module-decorators";
import store from "@/store";

export interface TestState {
    foo: string
}

@Module({ dynamic: true, store, name: "test" })
class Test extends VuexModule implements TestState {

    public foo = '';
    get getFoo(){
        return this.foo
    }

    @Mutation
    private CHANGE_FOO(foo: string) {
        this.foo = foo
    }

    @Action
    public changeFoo(foo: string) {
        console.log('action:' +foo)
        this.CHANGE_FOO(foo);
    }
}

export const TestModule = getModule(Test);

```
+ VuexModule 用于基本属性
```tsx
class Test extends VuexModule implements TestState {}
```
+ VuexModule 提供了一些基本属性，包括 
  + namespaced
  + state
  + getters
  + modules
  + mutations
  + actions
  + context

+ @Module 标记当前为 module
```tsx
@Module({ dynamic: true, store, name: "test" })
class Test extends VuexModule implements TestState {}
```
module 本身有几种可以配置的属性:
  + namespaced:boolean 启/停用 分模块
 + stateFactory:boolean 状态工厂
 + dynamic:boolean 在 store 创建之后，再添加到 store 中。开启 dynamic 之后必须提供下面的属性
 + name:string 指定模块名称
 + store:Vuex.Store 实体 提供初始的 store


+ @Mutation 标注为 mutation
 ```tsx
 @Mutation
    private CHANGE_FOO(foo: string) {
        this.foo = foo
    }
 ```

+ @Action 标注为 action
```tsx
@Action
    public changeFoo(foo: string) {
        console.log('action:' +foo)
        this.CHANGE_FOO(foo);
    }
```
+ getModule 得到一个类型安全的 store，module 必须提供 name 属性
```js
export const UserModule = getModule(User);
```
在vue文件中调用
```vue
<template>
  <div>
    <p>store用法</p>
    {{ $store.state.test.foo }}
    <div><input @change="changeVal" type="text" v-model="fooVal" /></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TestModule } from "@/store/test";
@Component
export default class TestStore extends Vue {
  private fooVal = "";

  private changeVal() {
    console.log(TestModule.foo);
    TestModule.changeFoo(this.fooVal);
  }
}
</script>
```

