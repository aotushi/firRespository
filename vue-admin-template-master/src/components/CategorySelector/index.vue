<template>
	<div>
        <el-form :inline="true" class='demo-form-inline' ref="form" :model="cForm" :disabled="!isShowList">
		<el-form-item label="一级分类">
			<el-select  placeholder="请选择" @change="handlerCategory1" v-model="cForm.category1Id">
				<el-option v-for="(c1, index) in category1List" :key='c1.id' :label="c1.name" :value="c1.id"></el-option>
			</el-select>
		</el-form-item>

        <el-form-item label="二级分类">
			<el-select  placeholder="请选择" @change="handlerCategory2" v-model="cForm.category2Id" >
				<el-option v-for="(c2,index) in category2List" :key="c2.id" :label="c2.name" :value="c2.id" ></el-option>
			</el-select>
		</el-form-item>


        <el-form-item label="三级分类">
			<el-select  placeholder="请选择" @change="handlerCategory3" v-model="cForm.category3Id">
				<el-option v-for="(c3,index) in category3List" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
			</el-select>
		</el-form-item>
	</el-form>
    </div>
</template>

<script>
export default {
	name: "CategorySelector",
    props:['isShowList'],
    data(){
        return {
            category1List:[],
            category2List:[],
            category3List:[],
            cForm:{
                category1Id:'',
                category2Id:'',
                category3Id:''
            }
        }
    },
    mounted(){
        this.getCategoryList1();
    },
    methods:{
        async getCategoryList1(){
            const result = await this.$API.category.getCategory1();
            if(result.code === 200){
                this.category1List = result.data;
            }
        },
        // 点击1级分类,请求2级分类数据
        async handlerCategory1(category1Id){
            // 再次选择一级分类数据,23级数据没有清空的bug
            this.category2List = '';
            this.category3List = '';
            this.cForm.category2Id = '';
            this.cForm.category3Id = '';
            // 触发自定义事件,把1级id传递给父组件,
            this.$emit('handlerCategory', {categoryId:category1Id, level:1});
            const result = await this.$API.category.getCategory2(category1Id);
            if(result.code === 200){
                this.category2List = result.data;
            }
        },
        async handlerCategory2(category2Id){
             // 再次选择一级分类数据,23级数据没有清空的bug
            this.category3List = '';
            this.cForm.category3Id = '';
            this.$emit('handlerCategory', {categoryId:category2Id, level:2});
            const result = await this.$API.category.getCategory3(category2Id);
            if(result.code === 200){
                this.category3List = result.data;
            }
        },
        handlerCategory3(category3Id){
            this.$emit('handlerCategory', {categoryId:category3Id, level:3});
        },
    }
};
</script>
