<template>
	<div>
		<el-form :data="spuForm">
			<el-form-item label="SPU名称" label-width="100px">
				<el-input v-model="spuForm.spuName"></el-input>
			</el-form-item>

			<el-form-item label="品牌" label-width="100px">
				<el-select v-model="spuForm.tmId" placeholder="请选择品牌">
					<el-option
						v-for="(tm, index) in trademarkList"
						:key="tm.id"
						:label="tm.tmName"
						:value="tm.id"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="SPU描述" label-width="100px">
				<el-input
					type="textarea"
					rows="4"
					v-model="spuForm.description"
				></el-input>
			</el-form-item>

			<el-form-item label="SPU图片" label-width="100px">
				<el-upload
					action="/dev-api/admin/product/fileupload"
					list-type="picture-card"
					:file-list="spuImageList"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
          :on-success="handlePictureSuccess"
				>
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="" />
				</el-dialog>
			</el-form-item>

			<el-form-item label="销售属性" label-width="100px">
				<el-select
					v-model="unsaveSaleAttrIdName"
					:placeholder="getUpdateSaleAttrList.length>0?`还有${getUpdateSaleAttrList.length}未选`:'没有了'"
				>
					<el-option
						v-for="(attrValue, index) in getUpdateSaleAttrList"
						:key="attrValue.id"
						:label="attrValue.name"
						:value="`${attrValue.id}:${attrValue.name}`"
					></el-option>
				</el-select>

				<el-button type="primary" icon="el-icon-plus" @click="addSaleAttr" :disabled="!unsaveSaleAttrIdName"
					>添加销售属性</el-button
				>

				<el-table
					border
					style="width: 100%"
					:data="spuForm.spuSaleAttrList"
				>
					<el-table-column
						type="index"
						align="center"
						label="序号"
						width="80"
					>
					</el-table-column>

					<el-table-column
						prop="saleAttrName"
						label="属性名"
						width="150"
					>
					</el-table-column>

					<el-table-column
						prop="prop"
						label="属性名称列表"
						width="width"
					>
						<template slot-scope="{ row, $index }">
							<!-- @close="handleClose(tag)" -->
							<el-tag
								:key="saleAttrValue.id"
								v-for="saleAttrValue in row.spuSaleAttrValueList"
								closable
								:disable-transitions="false"
							>
								{{ saleAttrValue.saleAttrValueName }}
							</el-tag>

							<el-input
								class="input-new-tag"
								v-if="row.inputVisible"
								v-model="row.inputValue"
								ref="saveTagInput"
								size="small"
								@keyup.enter.native="handleInputConfirm(row)"
								@blur="handleInputConfirm(row)"
							>
							</el-input>
							<!--@click="showInput(row)"  -->
							<el-button
								v-else
								class="button-new-tag"
								size="small"
                @click="showInput(row)"
								>增加</el-button
							>
						</template>
					</el-table-column>

					<el-table-column prop="prop" label="操作" width="150">
						<HintButton type="danger" icon="el-icon-delete" />
					</el-table-column>
				</el-table>
			</el-form-item>

			<el-form-item label-width="100px">
				<el-button type="primary">保存</el-button>
				<el-button @click="$emit('update:visible', false)"
					>取消</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "SpuForm",
	props: ["visible"],
	data() {
		return {
			// 和upload相关的动态数据
			dialogImageUrl: "",
			dialogVisible: false,

			spuForm: {
        category3Id:'',
        description:'',
        spuImageList:[],
        spuName:'',
        spuSaleAttrList:[],
        tmId:''
      },
			spuImageList: [],
			trademarkList: [],
			saleAttrList: [],
      unsaveSaleAttrIdName:''
		};
	},
	methods: {
		// 和upload相关的回调
		handleRemove(file, fileList) {
			// console.log(file, fileList);
      this.spuImageList = fileList;
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
    handlePictureSuccess(){
      this.spuImageList = fileList;
    },
		// 请求获取修改spu的初始化数据
		async getUpdateSpuFormInitData(spu) {
			//发4个请求
			//根据spu的id获取spu的详情
			//http://localhost:9529/dev-api/admin/product/getSpuById/4
			const result = await this.$API.spu.get(spu.id);
			if (result.code === 200) {
				this.spuForm = result.data;
			}
			//根据spu的id获取spu的图片列表
			//http://localhost:9529/dev-api/admin/product/spuImageList/4
			const imageResult = await this.$API.sku.getSpuImageList(spu.id);
			if (imageResult.code === 200) {
				let spuImageList = imageResult.data;
				// 我们为了让upload可以展示图片列表，必须把请求回来的图片当中添加上name和url

				spuImageList.forEach((item) => {
					item.name = item.imgName;
					item.url = item.imgUrl;
				});
				this.spuImageList = spuImageList;
			}

			//获取所有的品牌列表
			//http://localhost:9529/dev-api/admin/product/baseTrademark/getTrademarkList
			const trademarkResult = await this.$API.trademark.getList();
			if (trademarkResult.code === 200) {
				this.trademarkList = trademarkResult.data;
			}

			//获取所有的销售属性列表
			//http://localhost:9529/dev-api/admin/product/baseSaleAttrList
			const saleAttrResult = await this.$API.spu.getSaleAttrList();
			if (saleAttrResult.code === 200) {
				this.saleAttrList = saleAttrResult.data;
			}
		},
		// 请求获取添加spu的初始化数据
		async getAddSpuFormInitData() {
			//发两个请求
			//获取所有的品牌列表
			//http://localhost:9529/dev-api/admin/product/baseTrademark/getTrademarkList
			const trademarkResult = await this.$API.trademark.getList();
			if (trademarkResult.code === 200) {
				this.trademarkList = trademarkResult.data;
			}

			//获取所有的销售属性列表
			//http://localhost:9529/dev-api/admin/product/baseSaleAttrList
			const saleAttrResult = await this.$API.spu.getSaleAttrList();
			if (saleAttrResult.code === 200) {
				this.saleAttrList = saleAttrResult.data;
			}
		},

		// 属性值列表的回调
		handleClose(tag) {},

		//添加销售属性
    addSaleAttr(){
      let [baseSaleAttrId,saleAttrName] = this.unsaveSaleAttrIdName.split(':');
      let obj = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList:[]
      };

      this.spuForm.spuSaleAttrList.push(obj);
      this.unsaveSaleAttrIdName = ''
    },
    // 点击添加销售属性值列表当中的添加按钮
      showInput(row) {
        this.$set(row, 'inputVisible', true);

        // 自动获取焦点
        this.$nextTick(()=>{
          this.$refs.saveTagInput.focus();
        })
      },

    	// 用户输入属性值完成后失去焦点或回车的回调
		handleInputConfirm(row) {
			//
      let saleAttrValueName = row.inputValue;
      let baseSaleAttrId = row.baseSaleAttrId;

      if(saleAttrValueName.trim() === ''){
        this.$message.info('输入不能为空');
        return row.inputValue='';
      } 

      let isRepeat = row.spuSaleAttrValueList.some(item=>item.saleAttrValueName === saleAttrValueName);
      if(isRepeat){
        this.$message.info('不能重复');
        row.inputValue = ''
        return;
      }

      let obj = {
        baseSaleAttrId,
        saleAttrValueName
      }
      row.spuSaleAttrValueList.push(obj)

      row.inputVisible = false;
      row.inputValue = ''


		},

	},
	computed: {
		getUpdateSaleAttrList() {
			return this.saleAttrList.filter((item) => {
				return this.spuForm.spuSaleAttrList.every((item2) => {
					return item.name !== item2.saleAttrName;
				});
			});
		},
	},
};
</script>

<style>
.el-tag + .el-tag {
	margin-left: 10px;
}
.button-new-tag {
	margin-left: 10px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}
</style>