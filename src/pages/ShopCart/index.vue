<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul
                    class="cart-list"
                    v-for="(cart, index) in cartInfoList"
                    :key="cart.id"
                >
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="updateCartIsCheck(cart.skuId, cart.isChecked)"/>
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl" />
                        <div class="item-msg">{{ cart.skuName }}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ cart.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a
                            href="javascript:void(0)"
                            class="mins"
                            @click="changeSkuNum(-1, true, cart)"
                            >-</a
                        >
                        <input
                            autocomplete="off"
                            type="text"
                            :value="cart.skuNum"
                            minnum="1"
                            class="itxt"
                            @change="
                                changeSkuNum(
                                    $event.target.value * 1,
                                    false,
                                    cart.id
                                )
                            "
                        />
                        <a
                            href="javascript:void(0)"
                            class="plus"
                            @click="changeSkuNum(1, true, cart)"
                            >+</a
                        >
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{
                            cart.skuPrice * cart.skuNum
                        }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a href="javascript:;" class="sindelet" @click="deleteOne(cart.skuId)">删除</a>
                        <br />
                        <a href="javascript:;">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
                <span>全选</span>
            </div>
            <div class="option">
                <a href="javascript:;" @click="deleteSome">删除选中的商品</a>
                <a href="javascript:;">移到我的关注</a>
                <a href="javascript:;">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">
                    已选择 <span>{{ skuAllNum }}</span
                    >件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ skuAllPrice }}</i>
                </div>
                <div class="sumbtn">
                    <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
                    <router-link class="sum-btn" to="/trade">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: 'ShopCart',
    mounted(){
      this.getshopCartInfo();
    },
    methods:{
      // 页面加载时获取购物车列表信息
      getshopCartInfo(){
        this.$store.dispatch('getshopCartInfo')
      },
      // 输入框改变数量的回调函数: 文档要求传递的数值是变化的量. 判断变化的量->更新后台数据->请求后台数据并写入input中.
      async changeSkuNum(disNum, flag, cart){
        const originNum = cart.skuNum;
        if(flag){
          // flag为true, 证明是点击(+, -)进来的. disNum的值是(1, -1).
          // 变化的值是(1, -1). 最小的值只能为1, 小于零的情况也只有一种:disNum为-1, originNum为1. 其他情况下传进来的参数disNum的值就是变化的量.
          if(disNum + originNum <1){
            disNum = 1 - originNum;
          }
        }else{
          if(disNum < 1){
            disNum = 1 - originNum;
          }else{
            disNum = disNum - originNum;
          }
        }
        try {
          // 发请求更改数量
          await this.$store.dispatch('addOrUpdateShopCart', {skuId:cart.skuId, skuNum:disNum})
          alert('更改数量成功');
          // 发请求获取数量
          this.getshopCartInfo();
        } catch (error) {
          alert(error.message)
        }



      },
      // 更新单个复选框 点击事件
      async updateCartIsCheck(skuId, isChecked){
        try {
          await this.$store.dispatch('getCartIsChecked', {skuId, isChecked:isChecked?0:1});
          alert('单复选框状态更新成功');
          this.getshopCartInfo();
        } catch (error) {
          alert(error.message)
        }
      },
      // 删除单个商品
      async deleteOne(skuId){
        try {
          await this.$store.dispatch('getDeleteCart', skuId);
          alert('删除单个商品成功');
          this.getshopCartInfo();
        } catch (error) {
          alert(error.message);
        }
      },
      // 删除多个商品:2种方法:1.多次使用单个删除的模块;2.使用提供好的一次性接口
      async deleteSome(){
          try {
              await this.$store.dispatch('getDeleteSome');
            //   await this.$store.dispatch('getCartIsAllChecked', 0);
              alert('删除选中的商品成功');
              this.getshopCartInfo();
          } catch (error) {
              alert(error.message);
          }
      }
    },
    computed:{
      // 获取购物车列表的信息
      ...mapGetters(['cartInfo']),
      cartInfoList(){
        return this.cartInfo.cartInfoList || [];
      },
      // 计算商品总数量
      skuAllNum(){
        return this.cartInfoList.reduce((preValue, context)=>{
          return preValue += context.skuNum;
        }, 0)
      },
      // 计算商品总价格
      skuAllPrice(){
        return this.cartInfoList.reduce((preValue, context)=>{
          return preValue += context.skuPrice * context.skuNum;
        }, 0)
      },
      // 复选框的设置和取消. 使用v-model获取值,使用计算属性的完整写法
      isCheckAll:{
        get(){
          return this.cartInfoList.every(item=>item.isChecked)
        },
        async set(value){
          // value通过v-model获取的是布尔值
          try {
            await this.$store.dispatch('getCartIsAllChecked', value?1:0);
            alert('更新成功');
            this.getshopCartInfo();
          } catch (error) {
            alert(error.message);
          }
        }
      }


    }
  }
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                // .cart-list-con3 {
                //   width: 10%;

                //   .item-txt {
                //     text-align: center;
                //   }
                // }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
