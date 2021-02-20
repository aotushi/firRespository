<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl"  ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imageList'],
    // 使用data中defaultIndex和||运算符来处理假报错. 厉害!
    data(){
      return {
        defaultIndex:0
      }
    },
    computed:{
      defaultImg(){
        return this.imageList[this.defaultIndex] || {};
      }
    },
    mounted(){
      // mounted中接收全局事件总线传递过来的数据
      this.$bus.$on('deliverIndex', this.getIndex);
    },
    methods:{
      // methods中通过函数方法接收全局事件传递的数据
      getIndex(index){
        this.defaultIndex = index;
      },
      // 鼠标移动,蒙版动,大图动
      move(event){
        let mask = this.$refs.mask;
        let bigImg = this.$refs.bigImg;

        // 获取鼠标位置
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;
        
        // 根据鼠标位置和蒙版宽度高度计算蒙版位置
        let maskX = mouseX - mask.offsetWidth/2;
        let maskY = mouseY - mask.offsetHeight/2;

        // 限定蒙版移动的位置
        if(maskX <= 0){
          maskX = 0;
        }else if(maskX >= mask.offsetWidth){
          maskX = mask.offsetWidth;
        }
        if(maskY <= 0){
          maskY = 0;
        }else if(maskY >= mask.offsetHeight){
          maskY = mask.offsetHeight;
        }

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 大图位置是蒙版位置的反方向2倍
        bigImg.style.left = -2*maskX + 'px';
        bigImg.style.top = -2*maskY + 'px';
        
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>