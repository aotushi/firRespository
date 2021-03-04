## view-product-sku



### 数据展示和收集

```js
//不用template直接展示动态数据
<el-form-item  lable="label" label-width="100px" >
  {{spu.spuName}}
</el-form-item>

//select组件中的数据收集 v-model收集的就是option中value的值
<el-select  v-model="attr.attrIdValueId">
    <el-option :value="`${attr.id}:${attrValue.id}`" >
        
//图片列表的收集 selection-change会自动获取选中的图片的信息
<el-form-item label="图片列表">
    <el-table @selection-change="handleSelectionChange">
```





### 图片操作:设为默认|默认

```js
//在获取图片列表的同时,配置isDefault属性,避免后期使用$set
//这这里添加好属性后,直接将其赋值给响应式属性this.spuImageList,所以内部也都是响应式的
spuImageList.forEach((item)=>{item.isDefault = '0'});
this.spuImageList = spuImageList;

//排它实现 设为默认和默认的切换
setDefaultImg(row, spuImageList) {
    spuImageList.forEach((item)=>(item.isDefault = '0'));
    row.isDefault = '1';
}
```





### 平台/销售属性值列表中reduce方法使用

```js
//
skuForm.skuAttrValueList = attrList.reduce((prev, item)=>{
    if(item.attrIdValueId){
        let [attrId, valueId] = item.attrIdValueId.split(':');
        let obj = { attrId, valueId };
        prev.push(obj)
    }
    return prev;
},[])
```





























