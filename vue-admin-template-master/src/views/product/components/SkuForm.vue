<template>
  <div>
    <el-form :model="skuForm">
      <el-form-item label="SPU名称" label-width="100px">
        {{ spu.spuName }}
      </el-form-item>

      <el-form-item label="SKU名称" label-width="100px">
        <el-input  placeholder="SKU名称" v-model="skuForm.skuName"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)" label-width="100px">
        <el-input type="number" placeholder="价格(元)" v-model="skuForm.price"></el-input>
      </el-form-item>

      <el-form-item type="number" label="重量(千克)" label-width="100px">
        <el-input placeholder="重量(千克)" v-model="skuForm.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述" label-width="100px">
        <el-input
          placeholder="规格描述"
          type="textarea"
          rows="4"
          v-model="skuForm.skuDesc"
        ></el-input>
      </el-form-item>

      <!-- 平台属性 -->
      <el-form-item label="平台属性" label-width="100px">
        <el-form :inline="true">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrList"
            :key="attr.id"
          >
            <el-select
              value=""
              placeholder="请选择"
              v-model="attr.attrIdValueId"
            >
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!-- 销售属性 -->
      <el-form-item label="销售属性" label-width="100px">
        <el-form :inline="true">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="saleAttr.id"
          >
            <el-select
              value=""
              placeholder="请选择"
              v-model="saleAttr.saleAttrIdValueId"
            >
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <!-- 图片列表 -->
      <el-form-item label="图片列表" label-width="100px">
        <el-table
          border
          style="width: 100%"
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            prop="prop"
            label="label"
            width="55"
          >
          </el-table-column>

          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="名称" width="width">
            <template slot-scope="{ row, $index }">
              {{ row.imgName }}
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                v-if="row.isDefault === '0'"
                type="primary"
                size="mini"
                @click="setDefaultImg(row, spuImageList)"
                >设为默认</el-button
              >
              <el-tag v-else type="success">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!-- 底部按钮 -->
      <el-form-item label-width="100px">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spu: {},
      attrList: [],
      spuSaleAttrList: [],
      spuImageList: [],

      skuImageList: [],
      skuForm: {
        // 父组件传递过来的
        category3Id: "",
        tmId: "",
        spuId: "",
        // 通过v-model收集
        price: "",
        weight: "",
        skuName: "",
        skuDesc: "",
        // 自己收集 平台属性值列表
        skuAttrValueList: [],

        skuDefaultImg: "",
        skuImageList: [],
        skuSaleAttrValueList: []
      }
    };
  },
  methods: {
    async getAddSkuFormInitData(row, category1Id, category2Id) {
      this.spu = row;
      const promise1 = this.$API.attr.getList(
        category1Id,
        category2Id,
        row.category3Id
      );

      const promise2 = this.$API.sku.getSpuImageList(row.id);
      const promise3 = this.$API.sku.getSpuSaleAttrList(row.id);

      const result = await Promise.all([promise1, promise2, promise3]);

      this.attrList = result[0].data;
      this.spuSaleAttrList = result[2].data;
      let spuImageList = result[1].data;
      spuImageList.forEach(item => (item.isDefault = "0"));
      this.spuImageList = spuImageList;
    },

    // 收集图片列表
    handleSelectionChange(val) {
      console.log(val)
      this.skuImageList = val;
    },
    // 设置默认按钮
    setDefaultImg(row, spuImageList) {
      spuImageList.forEach(item => {
        item.isDefault = "0";
      });
      row.isDefault = "1";

      this.skuForm.skuDefaultImg = row.imgUrl;
    },

    // 保存
    async save() {
      // 获取参数
      let { spu, skuForm, attrList, spuSaleAttrList, skuImageList } = this;
      // 整理参数
      skuForm.spuId = spu.id;
      skuForm.category3Id = spu.category3Id;
      skuForm.tmId = spu.tmId;
      // 整理图片参数
      skuImageList = skuImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        };
      });
      skuForm.skuImageList = skuImageList;
      // 整理sku平台属性值列表和销售属性值列表
      skuForm.skuAttrValueList = attrList.reduce((prev, item) => {
        if (item.attrIdValueId) {
          let [attrId, valueId] = item.attrIdValueId.split(":");
          let obj = { attrId, valueId };
          prev.push(obj);
        }
        return prev;
      }, []);

      skuForm.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.saleAttrIdValueId) {
          let [saleAttrId, saleAttrValueId] = item.saleAttrIdValueId.split(":");
          let obj = { saleAttrId, saleAttrValueId};
          prev.push(obj);
        }
        return prev;
      }, []);

      // 发请求
      try {
        await this.$API.sku.addUpdate(skuForm);
        this.$message.success("保存sku成功");
        this.$emit("update:visible", false);
        this.resetData();
      } catch (error) {
        this.$message.error(error.message);
		this.resetData();
      }
    },

    // 清空数据
    resetData() {
      this.spu = {};
      this.attrList = [];
      this.spuSaleAttrList = [];
      this.spuImageList = [];
      this.skuImageList = [];
      this.skuForm = {
        spuId: "",
        category3Id: "",
        tmId: "",
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        skuAttrValueList: [],
        skuDefaultImg: "", //默认图片的路径
        skuImageList: [],
        skuSaleAttrValueList: []
      };
    },

    // 取消操作
    cancel() {
      // 返回列表页
      this.$emit("update:visible", false);
      // 清空sku数据
      this.resetData();
    }
  }
};
</script>

<style></style>
