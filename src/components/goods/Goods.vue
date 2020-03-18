<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 专场的数据显示 -->
        <!-- tips:  currentIndex返回的是区间范围的索引下标i -->
        <li
          class="menu-item food-list-hook"
          :class="{'current':currentIndex===0}"
          @click="selectMenu(0)"
        >
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon" />
            {{container.tag_name}}
          </p>
        </li>
        <!-- 遍历 -->
        <li
          class="menu-item food-list-hook"
          v-for="(item,index) in goods"
          :key="index"
          :class="{'current':currentIndex===index+1}"
          @click="selectMenu(index+1)"
        >
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon" />
            {{item.name}}
          </p>
          <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场活动图 -->
        <li class="container-list food-list-hook">
          <div v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url" />
          </div>
        </li>
        <!-- 具体分类 -->
        <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
          <h3 class="title">{{item.name}}</h3>
          <!-- 主要的商品列表 -->
          <ul>
            <li
              v-for="(food,index) in item.spus"
              :key="index"
              class="food-item"
              @click="showDetail(food)"
            >
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img
                  class="product"
                  :src="food.product_label_picture"
                  v-if="food.product_label_picture"
                />
                <p class="price">
                  <span class="text">￥{{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
              <!-- 放置加减组件在容器中 -->
              <div class="cartcontrol-wrapper">
                <app-cart-control :food="food"></app-cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <app-shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></app-shopcart>
    <!-- 商品详情 -->
    <app-product-detail :food="selectFood" ref="foodView"></app-product-detail>
  </div>
</template>
<script>
// better-scroll模块 npm install better-scroll --save
import BScroll from "better-scroll";
import Shopcart from "../shopcart/Shopcart";
import Cartcontrol from "../cartcontrol/Cartcontrol";
// 引入商品详情页
import ProductDetail from "../productDetial/ProductDetail";
export default {
  data() {
    return {
      container: {},
      goods: {},
      listHeight: [],
      menuScroll: {}, //保存实例化的foodScroll
      foodScroll: {}, //保存实例化的menuScroll
      scrollY: 0,
      poiInfo: {}, //这里用来属性传值到购物车存放处
      selectFood: {} //保存每个商品详情可能用的数据
    };
  },
  methods: {
    head_bg(img_name) {
      return "background-image:url(" + img_name + ")";
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3,
        click: true //better-scroll事件激活
      });
      //foodScroll 监听事件 引用better-scrollz中的scroll事件
      this.foodScroll.on("scroll", pos => {
        // console.log(pos.y);
        this.scrollY = Math.abs(Math.round(pos.y)); //取这个滚动数值的整数的绝对值
        // console.log(this.scrollY);
      });
    },
    caculateHeight() {
      // 取得每个元素容器的高度offsetHeight
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      // console.log(foodlist);
      //设置一个height用于累加
      let height = 0;
      this.listHeight.push(height); //[0]
      for (let i = 0; i < foodlist.length; i++) {
        //循环取到的这些元素的长度
        const item = foodlist[i]; //获取每一元素
        height += item.clientHeight; //取每个元素的可视区域的高度 累加
        this.listHeight.push(height);
      }
      //这里取不出来高度值，caculateHeight()方法是在钩子函数中执行，
      // 此时的DOM还没有加载完所有取不到这些DOM元素的可视高度
      // console.log(this.listHeight);
      // 解决办法：是在钩子函数中使用this.$nextTick()方法里面会有一个回调函数来执行我们的方法
      // nextTick()方法是等DOM加载完毕再执行
      // console.log(this.listHeight);
    },
    selectMenu(index) {
      // console.log(index);//接收传递进来的值
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let element = foodlist[index]; //找出我点击的那个下标的哪一个DOM元素
      //滚动到对应元素的位置better-scroll中 scrollToElement()方法  见下网址 具体说明
      // https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#scrolltoelementel-time-offsetx-offsety-easing
      this.foodScroll.scrollToElement(element, 250);
    },
    calculateCount(spus) {
      let count = 0;
      spus.forEach(item => {
        if (item.count > 0) {
          count += item.count;
        }
      });
      return count;
    },
    //点击每个商品详情页数据传递到一个变量中 传递到商品的详情页
    showDetail(food) {
      this.selectFood = food;
      // 当我点击的时候，拿到子级中定义的方法（父级改变子级中定义的变量）
      this.$refs.foodView.showView();
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        //获取商品的一个区间范围
        let Height_O = this.listHeight[i];
        let Height_T = this.listHeight[i + 1];
        // 判断滚动的高度是不是在这个范围里
        if (
          !Height_T ||
          (this.scrollY >= Height_O && this.scrollY < Height_T)
        ) {
          return i;
        }
      }
      return 0;
    },
    //这里是shopcart组件中点击加加减减的时候 将点击到的那个商品添加到一个数组里 方便以后今天数量和价格的统计放置在底部的显示上
    selectFoods() {
      let foods = [];
      this.goods.forEach(food_item => {
        food_item.spus.forEach(food => {
          // 判断下 如果当前遍历的这个对象中的count有值 那就是说明点击了 已经添加了 这个时候就把这组数据添加到
          //foods这个数组中去
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    "app-shopcart": Shopcart,
    "app-cart-control": Cartcontrol,
    "app-product-detail": ProductDetail
  },
  created() {
    fetch("/api/goods")
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.code == 0) {
          this.container = response.data.container_operation_source;
          this.goods = response.data.food_spu_tags;
          this.poiInfo = response.data.poi_info; //购物车存储

          // console.log(this.goods);
          //DOM渲染成功或者已经更新时候执行
          this.$nextTick(() => {
            //执行滚动方法
            this.initScroll();
            //计算分类的区间高度
            this.caculateHeight();
            // 监听滚动位置
            // 根据滚动位置确认下标和 左侧边对应
            // 通过下标实现点击左侧滚动右侧
          });
        }
      });
    //
  }
};
</script>

<style scoped>
@import url("../../../static/css/reset.css");
.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}

.goods .menu-wrapper {
  flex: 0 0 85px;
  background: f4f4f4;
}

.goods .foods-wrapper {
  flex: 1;
  /* background: lightskyblue; */
}
/* Menu item */
.goods .menu-wrapper .menu-item {
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}

.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .menu-wrapper .menu-item .text .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
/* Menu item */
.goods .menu-wrapper .menu-item {
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}

.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .menu-wrapper .menu-item .text .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
/* 专场样式 */
.goods .foods-wrapper .container-list {
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #e4e4e4;
}

.goods .foods-wrapper .container-list img {
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}
/* 具体分类商品布局 */
.goods .foods-wrapper .food-list {
  padding: 11px;
}

.goods .foods-wrapper .food-list .title {
  height: 13px;
  font-size: 13px;
  background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
  background-size: 2px 10px;
  padding-left: 7px;
  margin-bottom: 12px;
}

.goods .foods-wrapper .food-list .food-item {
  display: flex;
  margin-bottom: 25px;
  position: relative;
}

.goods .foods-wrapper .food-list .food-item .icon {
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content {
  flex: 1;
}
/* 具体内容样式 */
.goods .foods-wrapper .food-list .food-item .content .name {
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}

.goods .foods-wrapper .food-list .food-item .content .desc {
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;

  /* 超出部分显示省略号*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra {
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled {
  margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product {
  height: 15px;
  margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price {
  font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text {
  font-size: 14px;
  color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit {
  font-size: 12px;
  color: #bfbfbf;
}
/* 当前选中 */
.goods .menu-wrapper .menu-item.current {
  background: #cccccc;
  font-weight: bold;
  margin-top: -1px;
}
.goods .menu-wrapper .menu-item:first-child.current {
  margin-top: 1px;
}

.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}

.goods .menu-wrapper .menu-item .num {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  color: white;
  background: red;
  text-align: center;
  font-size: 7px;
  line-height: 13px;
}
</style>