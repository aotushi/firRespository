<template>
	<div>
		<el-card> 
      <CategorySelector
        @handlerCategory="handlerCategory"
        :isShowList="isShowList"
      ></CategorySelector>
    </el-card>

		<el-card style="margin-top:20px">
      <div v-show="!isShowSpuForm && !isShowSkuForm">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="showAddSpuForm">添加SPU</el-button>
        <el-table
          :data="spuList"
          style="width: 100%">

          <el-table-column
            prop="prop"
            label="序号"
            type="index"
            align="center"
            width="80">
          </el-table-column>

           <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width">
          </el-table-column>

           <el-table-column
            prop="prop"
            label="SPU描述"
            width="width">
          </el-table-column>

           <el-table-column
            prop="prop"
            label="操作"
            width="width">
              <template>
                <HintButton 
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SKU"
                @click="showAddSkuForm(row)"
              ></HintButton>

                <HintButton 
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SKU"
                @click="showUpdateSpuForm(row)"
              ></HintButton>

               <HintButton 
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看SPU的SKU列表"
                
              ></HintButton>

              <HintButton 
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除SPU"
                
              ></HintButton>
              </template>
          </el-table-column>
        </el-table>

        <el-pagination
                style="text-align:center"
                @size-change="handleSizeChange"
                @current-change="getSpuList"
                :current-page="page"
                :page-sizes="[2, 4, 6]"
                :page-size="limit"
                layout="  prev, pager, next, jumper,->, sizes,total"
                :total="total"
                :pager-count="5"
                >
              </el-pagination>
      </div>
      <SpuForm v-show="isShowSpuForm"></SpuForm>
      <SkuForm v-show="isShowSkuForm"></SkuForm>
    </el-card>
	</div>
</template>

<script>
import SkuForm from '@/views/product/components/SkuForm';
import SpuForm from '@/views/product/components/SpuForm';
export default {
	name: "Spu",
  components:{
    SkuForm,
    SpuForm
  },
  data(){
    return {
      category1Id:'',
      category2Id:'',
      category3Id:'',
      spuList:[],

      //有分页就得有这3个数据
      page:1,
      limit:2,
      total:0,
      isShowList:true,//三级分类的可操作性需要这个数据

      // 3个页面显示隐藏通过下面2个数据实现
      isShowSpuForm:false,
      isShowSkuForm:false,

    }
  },
  methods:{
    handlerCategory({categoryId, level}){
      if(level===1){
        this.category1Id = categoryId;

        this.category2Id = '',
        this.category3Id = '',
        this.spuList = []
      }else if(level === 2){
        this.category2Id = categoryId;

        this.category3Id = '',
        this.spuList = []
      }else{
        this.category3Id = categoryId;

        this.getSpuList();
      }
    },

    // 获取spulist分页列表
    async getSpuList(pager = 1){
      this.page = pager;
      let {page, limit, category3Id} = this;
      const result = await this.$API.spu.getList(page, limit, category3Id);
      if(result.code === 200){
        this.spuList = result.data.records;
        this.total = result.data.total
      }
    },
    // 分页器改变每页数量
    handleSizeChange(size){
      this.limit = size;
      this.getSpuList();
    },

    // 点击添加spu会从,显示spu添加页面
    showAddSpuForm(row){
      this.isShowSpuForm = true;
    },

    // 点击修改spu回调,显示spu修改页面(和添加同一个页面)
    showUpdateSpuForm(row){
      this.isShowSpuForm = true;
    },

    // 点击添加sku回调,显示添加sku页面
    showAddSkuForm(row){
      this.isShowSkuForm = true;
    }
  }

};
</script>

<style lang="scss" scoped>
</style>