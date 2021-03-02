## view-product-component-spuform





### refs子组件获取

```js
//高级组件通信中
 $refs: 包含所有有ref属性的标签对象或组件对象的容器对象
 能方便的得到子组件/后代组件/父组件/祖辈组件对象, 从而更新其data或调用其方法
```





### .sync父子组件通信同步

```js
<SpuForm v-show="isShowSpuForm" @update:visible="isShowSpuForm=$event" />
<SpuForm v-show="isShowSpuForm" :visible.sync="isShowSpuForm" />
    
子组件中
<el-button @click="$emit('update:visible', false)" ></el-button>
```



### el-table中的列数据展示获取

```js
<el-table :data="xx" border> //通过data获取数据 border关键字有无为边框显示的true/false

<el-table-column prop="prop" label="label"> 
//每列获取的prop都是xx(对象或数组)中按顺序的一项
//label显示列的名称
//width 直接数字赋值,无需单位px等
//一般在内部的select, input组件上有v-model属性,自动收集到:data对应的变量中
```





### 销售属性值的收集

```js
//点击添加销售属性值列表当中的按钮
showInput(row) {
    //1.实现后添加的属性响应式
    this.$set(row, 'inputVisible', true);
    //2.自动获取焦点
    this.$nextTick(()=>{
        this.$refs.saveTagInput.focus();
    })
}

//el-select中属性的收集
<el-select v-model="xxx"> 展示和收集,'xxx'一般在data中设置好,格式根据要求
 <el-option  vfor :label="xx.xx" :value="xx.xx" > label是展示,value是收集到xxx中
```

































