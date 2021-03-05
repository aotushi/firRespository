<template>
	<div>
		<el-card>
			<!-- 三级联动组件 -->
			<CategorySelector
				@handlerCategory="handlerCategory"
				:isShowList="isShowList"
			></CategorySelector>
		</el-card>

		<el-card style="margin-top: 20px">
			<div v-show="isShowList">
				<!-- 属性列表页 -->
				<el-button
					:disabled="!category3Id"
					type="primary"
					icon="el-icon-plus"
					@click="showAddDiv"
					>添加属性</el-button
				>

				<el-table :data="attrList" border style="width: 100%">
					<el-table-column
						prop="prop"
						label="序号"
						type="index"
						align="center"
						width="80"
					>
					</el-table-column>

					<el-table-column
						prop="attrName"
						label="属性名称"
						width="150"
					>
					</el-table-column>

					<el-table-column
						prop="prop"
						label="属性值列表"
						width="width"
					>
						<!-- 展示属性值列表的时候，我们需要遍历v-for，而且每个属性值外部有结构，所以也得用作用域插槽-->
						<template slot-scope="{ row, $index }">
							<!-- row代表的是当前遍历的这个属性，row.attrValueList才是你要自己遍历展示的属性值列表 -->
							<el-tag
								closable
								type="success"
								v-for="(attrValue, index) in row.attrValueList"
								:key="attrValue.id"
							>
								{{ attrValue.valueName }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column width="150" prop="prop" label="操作">
						<template slot-scope="{ row, $index }">
							<HintButton
								type="warning"
								icon="el-icon-edit"
								title="修改"
								size="mini"
								@click="showUpdateDiv(row)"
							/>
							<el-popconfirm :title="`确定删除${row.attrName}`" @onConfirm="deleteAttr(row)">
								<HintButton
								slot="reference"
								type="danger"
								icon="el-icon-delete"
								title="删除"
								size="mini"
							/>
							</el-popconfirm>
							
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!-- ================================================================================== -->
			<div v-show="!isShowList">
				<el-form :inline="true" width="80px" :model="attrForm">
					<el-form-item label="属性名">
						<el-input
							placeholder="请输入属性名"
							v-model="attrForm.attrName"
						></el-input>
					</el-form-item>
				</el-form>

				<el-button
					type="primary"
					icon="el-icon-plus"
					@click="addAttrValue"
					:disabled="!attrForm.attrName"
					>添加属性值</el-button
				>
				<el-button @click="isShowList = true">取消</el-button>

				<!-- 
          table展示假数据和收集数据
         -->
				<el-table
					:data="attrForm.attrValueList"
					border
					style="width: 100%; margin: 20px 0"
				>
					<el-table-column
						type="index"
						align="center"
						label="序号"
						width="80"
					>
					</el-table-column>

					<el-table-column
						prop="prop"
						label="属性值名称"
						width="width"
					>
						<!-- 修改按钮 修改属性值列表 -->
						<template slot-scope="{ row, $index }">
							<el-input
								:ref="$index"
								v-if="row.isEdit"
								v-model="row.valueName"
								placeholder="请输入属性值名称"
								@blur="toLook(row)"
								@keyup.enter.native="toLook(row)"
								size="mini"
							></el-input>
							<span
								v-else
								@click="toEdit(row, $index)"
								style="display: block; width: 100%"
								>{{ row.valueName }}</span
							>
						</template>
					</el-table-column>

					<el-table-column prop="prop" label="操作" width="width">
						<template slot-scope="{ row, $index }">
							<el-popconfirm
								:title="`确定删除${row.attrName}`"
								@onConfirm="
									attrForm.attrValueList.splice($index, 1)
								"
							>
								<HintButton
									slot="reference"
									type="danger"
									icon="el-icon-delete"
									title="删除属性值"
									size="mini"
								/>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>

				<el-button type="primary" @click="save" :disabled="!attrForm.attrValueList.length">保存</el-button>
				<el-button @click="isShowList = true">取消</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

export default {
	name: "Attr",
	data() {
		return {
			category1Id: "",
			category2Id: "",
			category3Id: "",
			attrList: [],
			isShowList: true,
			attrForm: {
				attrName: "",
				attrValueList: [],
				categoryId: 0, //
				categoryLevel: 3, //固定值
			},
		};
	},
	methods: {
		handlerCategory({ categoryId, level }) {
			if (level === 1) {
				this.category1Id = categoryId;

				// 解决bug:子组件重新选择1级,清空父组件中23级和属性列表
				this.category2Id = "";
				this.category3Id = "";
				this.attrList = [];
			} else if (level === 2) {
				this.category2Id = categoryId;

				this.category3Id = "";
				this.attrList = [];
			} else if (level === 3) {
				this.category3Id = categoryId;
				// 发请求拿平台属性的数据. 而不是在categorySelector组件中请求
				this.getAttrList();
			}
		},

		// 请求属性值的列表数据
		async getAttrList() {
			let { category1Id, category2Id, category3Id } = this;
			const result = await this.$API.attr.getList(
				category1Id,
				category2Id,
				category3Id
			);
			if (result.code === 200) {
				this.attrList = result.data;
			}
		},

		// 点击添加按钮显示添加的页面
		showAddDiv() {
			this.isShowList = false;
			// 每次点击添加按钮 都要把收集的数据重置
			//在这里我们可以顺便收集categoryId
			this.attrForm = {
				attrName: "",
				attrValueList: [],
				categoryId: this.category3Id,
				categoryLevel: 3,
			};
		},

		// 添加属性按钮
		addAttrValue() {
			this.attrForm.attrValueList.push({
				attrId: this.attrForm.id, //没有就是undefined
				valueName: "",
				isEdit: true, //这个属性值标识
			});

			this.$nextTick(() => {
				this.$refs[this.attrForm.attrValueList.length - 1].focus();
			});
		},

		// 点击修改属性按钮显示修改属性的页面
		showUpdateDiv(row) {
			this.isShowList = false;
			this.attrForm = cloneDeep(row);

			this.attrForm.attrValueList.forEach((item) =>
				this.$set(item, "isEdit", false)
			);
		},

		// input失去焦点或回车,变为查看模式
		toLook(row) {
			// 1.失去焦点时, 需要判断数据中是否有属性值名称.如果没有值或值不合法,不会变为span
			if (row.valueName.trim() === "") {
				row.valueName = "";
				return;
			}
			// 2.判断当前输入的值再除去自身以外,是否还有相同的属性值名称.如果存在就是重复,不能变为span
			let isRepeat = this.attrForm.attrValueList.some((item) => {
				if (item !== row) {
					return item.valueName === row.valueName;
				}
			});
			if (isRepeat) {
				this.$message.info("输入的属性名不能重复");
				row.valueName = "";
				return;
			}

			row.isEdit = false;
		},

		// span点击,切换为编辑模式
		toEdit(row) {
			row.isEdit = true;

			this.$nextTick(() => {
				this.$refs[index].focus();
			});
		},

		// 保存属性按钮
		async save() {
			// 1.获取参数
			let attr = this.attrForm;
			// 2.整理参数
			// 2.1 如果属性值名称如果为空串,从属性值列表中删除(没有失去焦点情况保存)
			// 2.2 属性值中取出isEdit属性
			attr.attrValueList = attr.attrValueList.filter((item) => {
				if (item.valueName !== "") {
					delete item.isEdit;
					return true;
				}
			});
			// 2.3 属性值列表中如果没有属性值,不发请求(都删除了)
			if (attr.attrValueList.length === 0) {
				this.$message.info("属性值列表须有属性才能保存");
				return;
			}
			// 3.发请求
			try {
				// 4.成功
				await this.$API.attr.addOrUpdate(attr);
				this.$message.success("保存属性成功");
				this.isShowList = true;
				this.getAttrList();
			} catch (error) {
				// 5.失败
				this.$message.error("保存属性失败");
			}
		},
		// 删除属性值
		async deleteAttr(row) {
			try {
				await this.$API.attr.delete(row.id);
				this.$message.success("删除成功");
				this.getAttrList();
			} catch (error) {
				this.$message.error("删除失败");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
</style>