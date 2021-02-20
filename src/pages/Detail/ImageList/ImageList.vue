<template>
  <div class="swiper-container" ref="imgSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(image, index) in imageList" :key="image.id">
        <img :src="image.imgUrl" @click="changeImg(index)" :class="{active:index === currentIndex}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    // 初始化一个数据,与方法中的点击事件配合, 当前索引值===点击的索引值.实现点击触发active样式,边框加颜色
    data(){
      return {
        currentIndex:0
      }
    },
    props:['imageList'],
    watch: {
        imageList: {
            immediate:true,
            handler() {
                this.$nextTick(() => {
                    new Swiper(this.$refs.imgSwiper, {
                        // direction: "vertical", // 垂直切换选项
                        // loop: true, // 循环模式选项

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        slidesPerView:4,
                        slidesPerGroup:2
                    });
                });
            },
        },
    },
    methods:{
      changeImg(index){
        this.currentIndex = index;
        // 全局事件总线,实现兄弟组件间通信
        this.$bus.$emit('deliverIndex', index);
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>