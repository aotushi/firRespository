<template>
    <div class="pagination">
        <button :disabled="currentPageNo === 1" @click="changePage(currentPage-1)">上一页</button>
        <button v-if="startEnd.start> 1" @click="changePage(1)" >1</button>
        <button v-if="startEnd.start> 2" >···</button>

        <button
            :class="{ active: currentPageNo === page }"
            v-for="page in startEnd.end"
            :key="page"
            v-if="page >= startEnd.start"
            @click="changePage(page)"
        >
            {{ page }}
        </button>

        <button v-if="startEnd.end < totalPageNo - 1" >···</button>
        <button v-if="startEnd.end < totalPageNo" @click="changePage(totalPageNo)" >{{ totalPageNo }}</button>
        <button :disabled="currentPageNo === totalPageNo" @click="changePage(currentPageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        currentPageNo: Number,
        pageSize: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            default: 0,
        },
        continueNo: {
            type: Number,
            required: true,
        },
    },
    methods:{
      changePage(page){
        this.$emit('changePage', page);
      }
    },
    computed: {
        totalPageNo() {
            let { total, pageSize } = this;
            return Math.ceil(total / pageSize);
        },
        // 计算连续页面的开始和结束
        startEnd() {
            let start = 0;
            let end = 0;
            let { currentPageNo, totalPageNo, continueNo } = this;

            // 如果连续页面数大于总页数
            if (continueNo >= totalPageNo) {
                start = 1;
                end = totalPageNo;
            } else {
                // 如果连续页面数小于总页数(正常情况)
                start = currentPageNo - Math.floor(continueNo / 2);
                end = currentPageNo + Math.floor(continueNo / 2);

                // 非正常情况. start小于1, end大于totalPageNo
                if (start <= 0) {
                    start = 1;
                    end = continueNo;
                }
                // 非正常情况, end大于totalPageNo
                if (end > totalPageNo) {
                    start = totalPageNo - continueNo + 1;
                    end = totalPageNo;
                }
            }
            return { start, end };
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
