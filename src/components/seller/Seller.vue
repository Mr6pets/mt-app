<template>
  <div class="seller" ref="sellerView">
    <div class="seller-wrapper">
      <app-split></app-split>
      <div class="seller-view">
        <div class="address-wrapper">
          <div class="address-left">{{seller.address}}</div>
          <address class="right">
            <div class="content"></div>
          </address>
        </div>
        <div class="pics-wrapper" v-if="seller.poi_env" ref="picsView">
          <ul class="pics-list" ref="picList">
            <li
              ref="picsItem"
              class="pics-item"
              v-for="(item,index) in seller.poi_env.thumbnails_url_list"
              :key="index"
            >
              <img :src="item" />
            </li>
          </ul>
        </div>
        <div class="safety-wrapper">
          查看食品安全档案
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <app-split></app-split>
      <div class="tip-wrapper">
        <div class="delivery-wrapper">配送服务：{{seller.app_delivery_tip}}</div>
        <div class="shipping-wrapper">配送时间：{{seller.shipping_time}}</div>
      </div>
      <app-split></app-split>
      <div class="other-wrapper">
        <div class="server-wrapper">
          商家服务
          <div class="poi-server" v-for="(item,index) in seller.poi_service" :key="index">
            <img :src="item.icon" alt />
            {{item.content}}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div class="discounts-item" v-for="(item,index) in seller.discounts2" :key="index">
            <div class="icon">
              <img :src="item.icon_url" alt />
            </div>
            <div class="text">{{item.info}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Split from "../split/Split";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      seller: {}
    };
  },
  components: {
    "app-split": Split
  },
  created() {
    fetch("/api/seller")
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.code == 0) {
          this.seller = response.data;
          // 完成请求后 初始化BScroll
          this.$nextTick(() => {
            if (this.seller.poi_env.thumbnails_url_list) {
              //如果有图片 初始化better-scroll
              //这个存个疑惑：better-scroll横向滚动需要设定长度值吗？
              //这里的容器宽度是（每个图片宽度+margin-right)*图片总个数
              //首先拿到单个的图片的可视宽度
              let imgW = this.$refs.picsItem[0].clientWidth;
              let marginR = 11;
              //得到总的宽度
              let widthAll =
                (imgW + marginR) *
                this.seller.poi_env.thumbnails_url_list.length;
              //设置ul的宽度值
              this.$refs.picList.style.width = widthAll + "px";
              this.scroll = new BScroll(this.$refs.picsView, {
                scrollX: true
              });
            }
            this.scroll = new BScroll(this.$refs.sellerView, {
              click: true
            });
          });
        }
      });
  }
};
</script>

<style scoped>
.seller {
  position: absolute;
  left: 0;
  top: 191px;
  bottom: 0px;
  width: 100%;
  background: #f4f4f4;
  overflow: hidden;
}

.seller .seller-wrapper {
  background: white;
}

.seller .seller-wrapper .seller-view {
  padding-left: 15px;
}

.seller .seller-wrapper .seller-view .address-wrapper {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #f4f4f4;
}

.seller .seller-wrapper .seller-view .address-wrapper .address-left {
  flex: 1;
  background: url(./img/address.png) no-repeat left center;
  padding-left: 26px;
  padding-right: 31px;
  background-size: 14px 16px;
  font-size: 14px;
  line-height: 19px;
}

.seller .seller-wrapper .seller-view .address-wrapper .address-right {
  flex: 0 0 60px;
  background: url(./img/line.png) no-repeat left center;
  background-size: 1px 15px;
}

.seller .seller-wrapper .seller-view .address-wrapper .address-right .content {
  width: 100%;
  height: 100%;
  background: url(./img/phone.png) no-repeat center center;
  background-size: 18px 18px;
}

.seller .seller-wrapper .seller-view .pics-wrapper {
  padding: 10px 0;
  overflow: hidden;
  border-bottom: 1px solid #f4f4f4;
  white-space: nowrap;
}

.seller .seller-wrapper .seller-view .pics-wrapper .pics-list {
}

.seller .seller-wrapper .seller-view .pics-wrapper .pics-list .pics-item {
  display: inline-block;
  margin-right: 11px;
  width: 93px;
  height: 75px;
}

.seller .seller-wrapper .seller-view .pics-wrapper .pics-list .pics-item img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.seller .seller-wrapper .seller-view .safety-wrapper {
  padding: 15px 14px 15px 25px;
  background: url(./img/safety.png) no-repeat left center;
  background-size: 14px 16px;
  font-size: 14px;
}

.seller .seller-wrapper .seller-view .safety-wrapper span {
  float: right;
  font-size: 14px;
}

.seller .seller-wrapper .tip-wrapper {
  padding-left: 15px;
}

.seller .seller-wrapper .tip-wrapper .delivery-wrapper {
  background: url(./img/delivery.png) no-repeat left center;
  background-size: 14px 16px;
  padding: 15px 0 15px 25px;
  font-size: 14px;
  border-bottom: 1px solid #f4f4f4;
}

.seller .seller-wrapper .tip-wrapper .shipping-wrapper {
  background: url(./img/time.png) no-repeat left center;
  padding: 15px 17px 15px 25px;
  background-size: 15px 15px;
  font-size: 14px;
  line-height: 18px;
}

.seller .seller-wrapper .other-wrapper {
  padding-left: 15px;
}

.seller .seller-wrapper .other-wrapper .server-wrapper {
  background: url(./img/server.png) no-repeat left center;
  background-size: 15px 15px;
  padding: 15px 0 17px 25px;
  font-size: 14px;
  border-bottom: 1px solid #f4f4f4;
}

.seller .seller-wrapper .other-wrapper .server-wrapper .poi-server {
  display: inline-block;
  margin-left: 17px;
}

.seller .seller-wrapper .other-wrapper .server-wrapper .poi-server img {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  vertical-align: middle;
}

.seller .seller-wrapper .other-wrapper .discounts-wrapper {
  padding: 17px 24px 19px 0;
}

.seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item {
  display: flex;
}

.seller
  .seller-wrapper
  .other-wrapper
  .discounts-wrapper
  .discounts-item
  .icon {
  flex: 0 0 25px;
}

.seller
  .seller-wrapper
  .other-wrapper
  .discounts-wrapper
  .discounts-item
  .icon
  img {
  width: 15px;
  height: 15px;
}

.seller
  .seller-wrapper
  .other-wrapper
  .discounts-wrapper
  .discounts-item
  .text {
  flex: 1;
  font-size: 14px;
}
</style>