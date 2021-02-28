## view-product-attr



### 三级分类

```js
三级分类:
1.数据展示 
 写三级分类接口请求函数
 一上来第一个分类就要有数据，所以我们要mouted发请求拿数据给第一项分类去遍历展示数据
 选中了第一项当中的某个分类，才会发请求拿第二项的数据进行遍历展示
 选中了第二项当中的某个分类，才会发请求拿第三项的数据进行遍历展示
 选中第一项需要清空第23项的数据
 选中第二项需要清空第三项的数据
 选中123项都要和父组件通信，把id传递到父组件当中

2.组件通信(自定义事件)
 父组件当中判断level保存三个id
 在父组件获取子组件传递过来的数据，保存3级id的时候需要发请求获取属性数据
 在父组件获取子组件传递过来的数据，保存1级id的时候需要清空父组件的23级id及属性列表数据
 在父组件获取子组件传递过来的数据，保存2级id的时候需要清空父组件的3级id及属性列表数据

```



```js
form表单的行内样式实现:添加属性 :inline="true"
form表单收集数据: 
<el-form :model="cForm">
    <el-select v-model="cForm.category1Id">
        <el-option :value="c1.id">
            
自定义事件@change="handlerCategory1"需要添加在select组件中, 事件名称必须是change
自定义事件属性值传递的方式{categoryId:category1Id, level:1} ++ //对象形式参数,添加了标志符
```



### HintButton

```js
//定义 注册 使用
```



### 使用v-show展示隐藏

```js
//页面上同一个位置的要展示两个div, 使用v-show来展示与隐藏
<div v-show="isShowList"></div>
<div v-show="!isShowList"></div>
```



### table如何收集数据

```js
input使用v-model既能展示数据又能收集数据:

<el-table :data="attrForm.attrValueList">
  <el-table-column>
    <template slot-scope="{row, $index}">
        <el-input v-model="row.valueName">
```





### 深拷贝

```js
拷贝:必须出现另外一个内存空间.
深拷贝: 对象当中所有的对象数据在拷贝给另一个内存的时候,拷贝数据而非地址
浅拷贝: 对象当中所有的对象数据再拷贝给另一个内存的时候,拷贝地址

如何深拷贝?使用lodash中的cloneDeep方法
import cloneDeep from 'lodash/cloneDeep';
this.xxx = cloneDeep(yyy)
```

















