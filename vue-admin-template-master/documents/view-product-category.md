## view-product-category



### 表格懒加载

```js
 <el-table
      border
      lazy
      :data="categorys"
      :load="load"
      style="width: 900px;margin-bottom: 20px;"
      :row-key="getRowKey"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :row-class-name="tableRowClassName"
    >
```





### 表格树形结构



