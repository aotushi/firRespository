<template>
    <!--列表-->
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播-->
                <SlideLoop :bannerList="bannerList" />
            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">尚品汇快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季
                            全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季
                            全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季
                            全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季
                            全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季
                            全民半价购数码
                        </li>
                    </ul>
                </div>
                <ul class="lifeservices">
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">话费</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">机票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">电影票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">游戏</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">彩票</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">加油站</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">酒店</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">火车票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">众筹</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">理财</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">礼品卡</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">白条</span>
                    </li>
                </ul>
                <div class="ads">
                    <img src="./images/ad1.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SlideLoop from "@/components/SlideLoop";

export default {
    name: "ListContainer",
    components: { SlideLoop },
    mounted() {
        this.$store.dispatch("getBannerList");
        // mounted中放入swiper实例化函数缺点: dispatch是异步函数,swiper是同步函数会先执行, 但其执行前提是页面结构内容完成
        // 但页面加载完成后,页面显示不一定成功. 所以要保证动态数据请求回来之后再去实例化.
        // 实例化作用的样式(第一个参数),因为ListContainer和floor组件v-for循环的轮播图样式名称一致,所以需要给标签添加ref属性
    },
    computed: {
        ...mapState({
            bannerList: (state) => state.home.bannerList,
        }),
    },
    // updated() {},
    // 第一种: 定时器
    // 第二种: 解决swiper无法在页面数据加载完成后实例化  nextTick是在最近的一次更新dom之后会立即调用传入nextTick的回调函数
    // 第三种: 模块化: 将多个组件内相同的html/css/js提出, 变成一个组件
    // watch: {
    //     bannerList: {
    //         immediate:true,
    //         handler() {
    //             this.$nextTick(() => {
    //                 new Swiper(this.$refs.bannerSwiper, {
    //                     // direction: "vertical", // 垂直切换选项
    //                     loop: true, // 循环模式选项

    //                     // 如果需要分页器
    //                     pagination: {
    //                         el: ".swiper-pagination",
    //                     },

    //                     // 如果需要前进后退按钮
    //                     navigation: {
    //                         nextEl: ".swiper-button-next",
    //                         prevEl: ".swiper-button-prev",
    //                     },

    //                     // 如果需要滚动条
    //                     // scrollbar: {
    //                     //     el: ".swiper-scrollbar",
    //                     // },
    //                 });
    //             });
    //         },
    //     },
    // },
};
</script>

<style lang="less" scoped>
.list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
        height: 464px;
        padding-left: 210px;

        .center {
            box-sizing: border-box;
            width: 740px;
            height: 100%;
            padding: 5px;
            float: left;
        }

        .right {
            float: left;
            width: 250px;

            .news {
                border: 1px solid #e4e4e4;
                margin-top: 5px;

                h4 {
                    border-bottom: 1px solid #e4e4e4;
                    padding: 5px 10px;
                    margin: 5px 5px 0;
                    line-height: 22px;
                    overflow: hidden;
                    font-size: 14px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .news-list {
                    padding: 5px 15px;
                    line-height: 26px;

                    .bold {
                        font-weight: 700;
                    }
                }
            }

            .lifeservices {
                border-right: 1px solid #e4e4e4;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;

                .life-item {
                    border-left: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    margin-right: -1px;
                    height: 64px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    width: 25%;

                    .list-item {
                        background-image: url(./images/icons.png);
                        width: 61px;
                        height: 40px;
                        display: block;
                    }

                    .service-intro {
                        line-height: 22px;
                        width: 60px;
                        display: block;
                    }

                    &:nth-child(1) {
                        .list-item {
                            background-position: 0px -5px;
                        }
                    }

                    &:nth-child(2) {
                        .list-item {
                            background-position: -62px -5px;
                        }
                    }

                    &:nth-child(3) {
                        .list-item {
                            background-position: -126px -5px;
                        }
                    }

                    &:nth-child(4) {
                        .list-item {
                            background-position: -190px -5px;
                        }
                    }

                    &:nth-child(5) {
                        .list-item {
                            background-position: 0px -76px;
                        }
                    }

                    &:nth-child(6) {
                        .list-item {
                            background-position: -62px -76px;
                        }
                    }

                    &:nth-child(7) {
                        .list-item {
                            background-position: -126px -76px;
                        }
                    }

                    &:nth-child(8) {
                        .list-item {
                            background-position: -190px -76px;
                        }
                    }

                    &:nth-child(9) {
                        .list-item {
                            background-position: 0px -146px;
                        }
                    }

                    &:nth-child(10) {
                        .list-item {
                            background-position: -62px -146px;
                        }
                    }

                    &:nth-child(11) {
                        .list-item {
                            background-position: -126px -146px;
                        }
                    }

                    &:nth-child(12) {
                        .list-item {
                            background-position: -190px -146px;
                        }
                    }
                }
            }

            .ads {
                margin-top: 5px;

                img {
                    opacity: 0.8;
                    transition: all 400ms;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>
