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



### 编辑模式和查看模式的切换

```js

给每个属性值添加<模式标识>数据,用于确定这个属性值当前是input还是span
 添加属性值时,都添加一个属性isEdit:true, 代表添加属性值是编辑模式
 修改属性值时,都添加一个属性isEdit:false, 这里需要使用$set才能实现响应式.!!
 每个属性值根据isEdit决定展示input还是span,使用v-if
```



```js


<el-input 
	v-if="row.isEdit"
	@blur="toLook(row)"
	@keyup.enter.native="toLook(row)"
></el-input>

<span v-else @click="toEdit(row)"> {{row.valueName}} </span>

//点击添加属性值回调
addAttrValue() {
    this.attrForm.attrValueList.push({
        attrId: this.attrForm.id, //这个id代表属性值所属属性的id,有id就是修改页面,没有就是增加页面undefined
        valueName: '', //需要用户输入的属性值名称
        isEdit: true  // 这个属性标识证明这个属性值的模式是编辑模式
    })
}

//点击添加修改属性按钮显示修改属性的页面
showUpdateDiv(row) {
    this.isShowList = true;
    this.attrForm = cloneDeep(row);
    
    this.attrForm.attrValueList.forEach((item)=>{
        this.$set(item, 'isEdit', false)
    })
}

//input失去焦点或回车,切换为查看模式
toLook(row) {
    //1.失去焦点或回车后,需要判断数据中是否有属性值名称,没有值或值不合法,不会变为span
    if(row.valueName.trim()==='') {
        return row.valueName = '';
    }
    //2.还需要判断当前输入的值,是否和已经存在的属性值相同.如果重复,不能变为span
    let isRepeat = this.attrForm.attrValueList.some(item=>{
        if(item !== row){
            return item.valueName === row.valueName
        }
    })
    if(isRepeat){
        this.$message.info('重复了');
        row.valueName = '';
        return;
    }
    row.isEdit = false;
}

//对span进行点击时,切换为编辑模式
toEdit(row) {
    row.isEdit = true;
}
```



### 响应式对象数据属性的添加和删除

```js
//响应式数据添加this.$set(),  Vue.set()
this.$set(item, 'isEdit', false) //需要添加属性的对象,添加的属性性,属性值

//响应式数据删除 this.$delete() Vue.delete()
错误: 直接delete删除对象当中的属性，不会导致页面更改.因为响应式属性只是在检测属性值的改变而不是检测属性的删除
正确：我们需要使用Vue.delete this.$delete方法  除了删除，还添加了更新界面的操作
```



### 自动获取焦点

```js
//什么时候: 1.添加属性值  2.从span变为input的时候
//使用方法: 元素添加focus()方法
//如何获取当前元素? ref+下标index
//注意事项: 使用this.$nextTick()方法, 避免元素还未创建成功就读取产生的错误.
 //this.$nextTick() 页面更新完成后自动调用

addAttrValue() {
    this.$nextTick(()=>{
        this.$refs[this.attrForm.attrValueList.length - 1].focus();
    })
}

toEdit(row,index) {
    this.$nextTick(()=>{
        this.$refs[index].focus();
    })
}
```



### 气泡确认框

```js
//按钮点击事件为onConfirm
```





### 保存属性操作

```js
//
async save(){
    //1.获取参数
    let attr = this.attrForm;
    //2.整理参数
    //2.1 如果属性值名称如果为空串,从属性值列表中删除(没有失去焦点的情况保存)
    //2.2 属性值中试试isEdit属性
    attr.attrValueList = attr.attrValueList.filter((item)=>{
        if(item.valueName !==''){
            delete item.isEdit;
            return true;
        }
    })
    //2.3 属性值列表中如果没有属性值,不发请求
    if(attr.attrValueList.length === 0){
        this.$message.info('须有属性才能保存');
        return;
    }
    //3.发请求
    try{
        //4.成功
        await this.$API.attr.addOrUpdate(attr);
        this.$message.success('保存成功')
        this.isShowList = true;
        this.getAttrList();
    }catch(error){
        //5.失败
        this.$message.error('失败')
    }
}
```























































