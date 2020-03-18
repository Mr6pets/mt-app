<template>
  <div class="star">
    <span class="star-item" v-for="(itemClass,index) in itemClass" :key="index" :class="itemClass"></span>
  </div>
</template>
<script>
// 星的长度为5
const LENGTH = 5;
//定义星的状态 on为全星 依次类推
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";
export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClass() {
      //定义一个空的数组 存储星星的状态
      let result = [];

      //这里拿到的score是4.7 思路：4.7*2=9.4向下取证9,9/2=4.5 四个全星 一个半星
      //同样如果是3.6  3.6*2=7.2 向下取证7，7/2=3.5就是3个全星 一个半星
      let score = Math.floor(this.score * 2) / 2;

      //半个星星
      //思路：对处理过后的score进行取余 整数取余 一定是0 小数取余不等于0 所以就说明他有半个星星
      let hasDecimal = score % 1 !== 0; //0.5

      //整个星星
      //思路：取证 4.5 取整 为4
      let integer = Math.floor(score);

      //遍历全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON); //这里的就会有4个全星
      }
      //半星处理
      if (hasDecimal) {
        result.push(CLS_HALF);
      }

      //补齐:result的这个数组没有满足长度 ，那就补齐剩下的
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      //4.7这里的例子就是现在的result 为[CLS_ON,CLS_ON,CLS_ON,CLS_ON,CLS_HALF]
      return result;
    }
  }
};
</script>
<style scoped>
.star {
  font-size: 0;
}
.star .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}
.star .star-item:last-child {
  margin-right: 0;
}

/* 三种图片类型*/
.star .on {
  background-image: url(img/star24_on@2x.png);
}
.star .half {
  background-image: url(img/star24_half@2x.png);
}
.star .off {
  background-image: url(img/star24_off@2x.png);
}
</style>