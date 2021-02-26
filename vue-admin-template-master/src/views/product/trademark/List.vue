<template>
	<div>
		<!-- 按钮 -->
		<el-button type="primary" icon="el-icon-plus" @click="showAddDialog"
			>增加</el-button
		>
		<!-- 表格 -->
		<el-table
			:data="trademarkList"
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

			<el-table-column prop="tmName" label="品牌名称" width="width">
			</el-table-column>

			<el-table-column label="品牌Logo" width="width">
				<template slot-scope="{ row, $index }">
					<img :src="row.logoUrl" style="width: 80px; height: 60px" />
				</template>
			</el-table-column>
			<el-table-column width="width" label="操作">
				<template slot-scope="{ row, $index }">
					<el-button type="warning" icon="el-icon-edit" size="mini" @click="showUpdateDialog(row)"
						>修改</el-button
					>
					<el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTrademark(row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页器 
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
    -->
		<el-pagination
			style="text-align: center"
			background
			:current-page="page"
			:page-sizes="[3, 5, 10]"
			:page-size="limit"
			:pager-count="5"
			layout="  prev, pager, next, jumper,->, sizes,total"
			:total="total"
			@size-change="handleSizeChange"
			@current-change="getTrademarkList"
		>
		</el-pagination>

		<!-- 
      点击添加或修改按钮的弹出框
     -->
		<el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
			<el-form style="width:80%" :model="tmForm">

				<el-form-item label="品牌名称" label-width="100px">
					<el-input  autocomplete="off" v-model="tmForm.tmName"></el-input>
				</el-form-item>

				<el-form-item label="品牌LOGO" label-width="100px" >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addOrUpdateTrademark"
					>确 定</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "Trademark",
	data() {
		return {
			page: 1,
			limit: 3,
			trademarkList: [],
			total: 0,
      dialogFormVisible:false,
      tmForm:{
        tmName:'',
        logoUrl:''
      }
		};
	},
	mounted() {
		this.getTrademarkList();
	},
	methods: {
		async getTrademarkList(page = 1) {
			this.page = page;
			const result = await this.$API.trademark.getPageList(
				this.page,
				this.limit
			);
			if (result.code === 200) {
				this.trademarkList = result.data.records;
				this.total = result.data.total;
			}
		},
		// 分页器-改变当前页面数量
		handleSizeChange(size) {
			this.limit = size;
			this.getTrademarkList();
		},
		// 分页器-切换页面的事件  可省略,采用另一种方式
		// handleCurrentChange(page){
		//   this.page = page;
		//   this.getTrademarkList();
		// }

		// 增加按钮的事件回调
		showAddDialog() {
      this.dialogFormVisible = true;
      // 解决图片上传取消按钮的bug
      this.tmForm = {
        tmName:'',
        logoUrl:''
      }
    },

     handleAvatarSuccess(res, file) {
        // res上传成功后返回的响应数据
        // file代表上传成功后返回的图片文档本身
        this.tmForm.logoUrl = res.data; //or file.response.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      // 修改按钮的回调
      showUpdateDialog(row){
        this.dialogFormVisible = true;
        // 注意:如果采用this.tmForm = row的方式会出现bug.要使用拷贝方式,因为都是基本数据类型,可以使用浅拷贝.
        // this.tmForm.tmName = row.tmName;
        // this.tmForm.logoUrl = row.logoUrl;
        this.tmForm = {...row};
        
      },
      // 修改按钮点击的回调:添加或修改品牌
      async addOrUpdateTrademark(){
        // 获取参数
        let trademark = this.tmForm;
        // 整理参数

        // 发请求
        try {
          await this.$API.trademark.addOrUpdate(trademark);
          //成功后 1.消息提示
          this.$message.success(trademark.id?'修改品牌成功':'添加品牌成功');
          // 2.关闭弹出框dialog,回到列表页
          this.dialogFormVisible = false;
          // 3.重新请求列表页数据:如果是添加则请求第一页数据;如果是修改请求当前页数据
          this.getTrademarkList(trademark.id?this.page:1)
        } catch (error) {
          // this.$message.error(trademark.id?'修改品牌失败':'添加品牌失败')
          this.$message.error(error.message)
        }
      },
      // 删除按钮点击的回调
        deleteTrademark(row){
        this.$confirm(`你确定删除${row.tmName}吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
             await this.$API.trademark.delete(row.id);
          // 1.删除成功后信息提示
          this.$message.success('删除品牌成功');
          // 2.重新发送请求获取数据: 如果当前页只有一条数据那么需要回到前一页;如果当前数据大于1条,那么留在当前页
          this.getTrademarkList(this.trademarkList.length>1?this.page:this.page-1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          } catch (error) {
            this.$message.error('删除品牌失败')
          }
         
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        });
      }

	},
};
</script>

// <style lang="scss" scoped>
// </style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>