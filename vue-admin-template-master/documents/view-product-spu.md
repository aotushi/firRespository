## view-product-spu



### 三级联动组件

```js

```



### 分页器

```js
<el-pagination>
```



### 3个页面显示隐藏

```js
3个页面显示隐藏通过2个数据实现,通过v-show实现
isShowSpuForm=false;
isShowSpuForm=false;

<div v-show="!isShowSpuForm && !isShowSpuForm">
<SpuForm v-show="isShowSpuForm"></SpuForm>
<SkuForm v-show="isShowSkuForm"></SkuForm>
```



