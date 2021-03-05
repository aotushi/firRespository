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



#### 三级联动组件可操作性

```js
3级联动组件的可操作性在spu页面时根据是否进入SpuForm,SkuForm页面相关.没有进入可点击,进入了不能点击.

2种实现:
2.1 当点击相关回调时,直接将this.isShowList的值变为false
2.2 监视.当SpuForm,SkuForm状态改变时,更改this.isShowList状态
watch:{
    isShowSpuForm(newVal, oldVal){
      this.isShowList = !newVal;
    },
    isShowSkuForm:{
      handler(newVal, oldVal){
        this.isShowList = !newVal;
      }
    }
  },
```

