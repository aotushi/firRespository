<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="moveOutItem"  @mouseenter="isShow=true">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow" >
                        <div class="all-sort-list2" @click="toSearch">
                            <div
                                class="item"
                                v-for="(c1, index) in categoryList"
                                :key="c1.categoryId"
                                :class="{ item_on: currentIndex === index }"
                                @mouseenter="moveInItem(index)"
                            >
                                <h3>
                                    <!-- <a href="">{{ c1.categoryName }}</a> -->
                                    <!-- 第一种:声明式导航 -->
                                    <!-- <router-link 
                                        :to="{
                                            name:'search',
                                            query:{
                                                category1Id:c1.categoryid,
                                                categoryName:c1.categoryname
                                            }
                                        }">{{ c1.categoryName }}
                                    </router-link> -->

                                    <!-- 第二种 编程式导航 -->
                                    <!-- <router-link 
                                        @click="$router.push({
                                            name:'search',
                                            query:{
                                                category1Id:c1.categoryId,
                                                categoryName:c1.categoryname
                                            }
                                        })">{{ c1.categoryName }}
                                    </router-link> -->

                                    <!-- 第三种: 事件委托 -->
                                    <a
                                        href="javascript:;"
                                        :data-category1Id="c1.categoryId"
                                        :data-categoryName="c1.categoryName"
                                        >{{ c1.categoryName }}</a
                                    >
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl
                                            class="fore"
                                            v-for="c2 in c1.categoryChild"
                                            :key="c2.categoryId"
                                        >
                                            <dt>
                                                <a
                                                    href="javascript:;"
                                                    :data-category2Id="
                                                        c2.categoryId
                                                    "
                                                    :data-categoryName="
                                                        c2.categoryName
                                                    "
                                                    >{{ c2.categoryName }}</a
                                                >
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="c3 in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        href="javascript:;"
                                                        :data-category3Id="
                                                            c3.categoryId
                                                        "
                                                        :data-categoryName="
                                                            c3.categoryName
                                                        "
                                                        >{{ c3.categoryName }}</a
                                                    >
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,
            isShow: true,
        };
    },
    methods: {
        // 节流函数
        // throttle(renewToken, 300000, { 'trailing': false });
        moveInItem: throttle(
            function(index) {
                this.currentIndex = index;
                console.log(index);
            },
            5,
            { trailing: false }
        ),
        // 事件委托函数,代替声明和编程路由导航造成的卡顿
        // 获取自定义标签属性书写方式:data-, 获取方式:dataset
        toSearch(event) {
            let targetNode = event.target;
            let {
                category1id,
                category2id,
                category3id,
                categoryname,
            } = targetNode.dataset;
            // 通过categoryname来判断点击的是否是<a>标签
            if (categoryname) {
                // 判断及添加路径内容
                let location = { name: "search" };
                let query = { categoryName: categoryname };
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                location.query = query;
                // params参数+query参数合并查询
                if(this.$route.params){
                    location.params=this.$route.params;
                }
                this.$router.push(location);
            }
        },
        // 鼠标移出(列表显示+下级目录显示(初始值-1))
        moveOutItem(){
            this.currentIndex = -1;
            if(this.$route.path !== '/home'){
                this.isShow=false;
            }
        }
    },
    mounted() {
        if (this.$route.path !== "/home") {
            this.isShow = false;
        }
        // 优化TypeNav模块的ajax请求,放置到只生成一次的组件当中:app
        // this.$store.dispatch("getCategoryList");
    },
    //从vuex当中把数据捞到vue组件当中使用
    //以后只要从vuex拿的是数据(state和getters当中的东西)，都在computed当中拿，
    //以后只要从vuex拿的是方法(mutations和actions当中的东西)，都在methods当中去拿，一般用的很少
    computed: {
        ...mapState({
            categoryList: (state) => state.home.categoryList,
        }),
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

                &.sort-enter{
                    height:0px;
                    opacity:0;
                }
                &.sort-enter-active{
                    transition:all 2s;
                }
                &.sort-enter-to{
                    height:461px;
                    opacity:1;
                }

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 18px;
                                        line-height: 18px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                        &:hover {
                                            background: #ddd;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &.item_on {
                        background: #ddd;
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>
