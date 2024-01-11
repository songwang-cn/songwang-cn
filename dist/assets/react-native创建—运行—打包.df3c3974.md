本人是在window系统上面创建的react-native项目

安卓

1  安装node环境，java环境并配置环境变量

​    安装后   测试是否安装成功 

  ![image-20210916160507307](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916160507307.png)![image-20210916161142191](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916161142191.png)



2  安装androidStudio，需下载sdk

3  安装一个模拟器，本人使用的是逍遥模拟器（也可以使用androidStudio里的模拟器，对于电脑配置较低的同学不推荐）

以上三部基本环境已经配置完成，下面就是创建react-native项目的过程

1  首先安装 react-native 的脚手架工具： npm i -g react-native-cli

2  项目创建： react-native init  nativeProject

3  打开逍遥模拟器，命令行通过adb devices 查看当前已有的模拟器或设备(此操作需AndroidStudio及其SDK成功安装之后)

![image-20210916162342025](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916162342025.png)

4  连接模拟器，逍遥模拟器的ip和端口为 127.0.0.1：21503

![image-20210916162543426](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916162543426.png)

5  再次查看设备连接状态

![image-20210916162638068](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916162638068.png)

6  设备连接成功后，准备run项目，在这步之前需要在项目里面配置androidSdk的位置，否则项目运行会报错

​     在android目录下新建local.properties文件，里面写入androidSDK位置 

​         sdk.dir = D:/Program Files (x86)/android-sdk-windows

![image-20210916164413332](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916164413332.png)

![image-20210916164310703](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916164310703.png)

7  项目运行  react-native run-android  或   npm  run  android

![image-20210916164650628](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916164650628.png)

运行成功之后，模拟器会自动启动我们的app

![image-20210916165050733](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916165050733.png)

修改代码保存后，界面会热更新

![image-20210916165219534](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916165219534.png)

到这里我们的 react-native 项目 的基本就搭建完成了，接下来就是引入各种依赖，第三方组件，进行业务开发



接下来将我们的项目上传到码云

1 现在码云上面新建仓库

2 初始化本地仓库  cd  nativeProject  &&  git init

   然后就是熟悉的几步操作  

 git  add .

 git commit -m 'xxxx'

 git remote add origin  仓库地址

 git push 

ios

1  环境配置还是一样，自行百度

2  将码云上面的项目拉下来，并安装依赖

3  mac 上开发还需要用到pod ，需要提前安装好  (需要科学上网，否则安装失败)

  cd ios   &&   pod install

   在ios目录下执行pod  install  (需要科学上网，否则安装失败)

![8c50e2fa544f7d02ee7c464b3e4f554](C:\Users\songwang\AppData\Local\Temp\WeChat Files\8c50e2fa544f7d02ee7c464b3e4f554.jpg)

4  在ios目录下打开(第一次只有上面那个，运行过后会生成一个   .xcworkspace  文件)

![53e5c9667f0027e6118687ab56771d3](C:\Users\songwang\AppData\Local\Temp\WeChat Files\53e5c9667f0027e6118687ab56771d3.jpg)

运行项目

![eb8325f08db67b46ebae2e9925e17af](C:\Users\songwang\AppData\Local\Temp\WeChat Files\eb8325f08db67b46ebae2e9925e17af.jpg)





打包流程

android打包

1  生成签名密匙

   进入jdk/bin目录 ：  D:\Program Files (x86)\java\jdk1.8.0_152\bin

   执行生成密匙的命令 ： keytool -genkeypair -v -storetype PKCS12 -keystore ${keyName}.keystore -alias ${keyAlias} -keyalg RSA -keysize 2048 -validity 1000

注意  ${}  处不能与之前创建过的同名

![16a199a0406961dc60c250fee43c39b](C:\Users\songwang\AppData\Local\Temp\WeChat Files\16a199a0406961dc60c250fee43c39b.png)

口令自己设置，后面需要配置到项目中，

生成的key会存在jdk/bin目录下

![image-20210916173932309](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916173932309.png)

将它添加到项目的app目录下

![image-20210916174044399](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916174044399.png)

在gradle.properties文件中添加配置项

MYAPP_RELEASE_STORE_FILE= my-release-key.keystore  

MYAPP_RELEASE_KEY_ALIAS= my-key-alias

MYAPP_RELEASE_STORE_PASSWORD=123456

MYAPP_RELEASE_KEY_PASSWORD=123456

![image-20210916174255462](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916174255462.png)



最后配置app目录下的build.gradle

在signingConfig项中添加 release 配置

 release {

​          if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {

​            storeFile file(MYAPP_RELEASE_STORE_FILE)

​            storePassword MYAPP_RELEASE_STORE_PASSWORD

​            keyAlias MYAPP_RELEASE_KEY_ALIAS

​            keyPassword MYAPP_RELEASE_KEY_PASSWORD

​          }

​        }

在buildType中应用刚才的配置

release {

​       signingConfig signingConfigs.release

​    }

![image-20210916174634765](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916174634765.png)

最后在android 目录下运行  ./gradlew assembleRelease  打包

![image-20210916174835926](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916174835926.png)

可以将命令配置到package.json里

![image-20210916174912280](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916174912280.png)

直接执行    npm    run   build   打包

![image-20210916175041886](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916175041886.png)

打包成功后，找到apk包发布即可

![image-20210916175145058](C:\Users\songwang\AppData\Roaming\Typora\typora-user-images\image-20210916175145058.png)







IOS 打包需要再研究一下