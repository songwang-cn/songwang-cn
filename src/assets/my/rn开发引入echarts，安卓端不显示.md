1.1复制`tpl.html`文件
复制文件`tpl.html`（路径： `node_modules\native-echarts\src\components\Echarts`）
至`android\app\src\main\assets`目录下
1.2编辑`index.js`文件
路径：`node_modules\native-echarts\src\components\Echarts`
将 source = {require('/tpl.html')} 改为 

source = {Platform.OS === 'ios' ? require('./tpl.html') : {uri:'file:///android_asset/tpl.html'}} 即可

