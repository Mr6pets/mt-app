<template>
  <div id="app">
    <!-- 头部 -->
    <app-header :poiInfo="poi_info"></app-header>
    <!-- 导航 -->
    <app-nav :commentNum="commentNum"></app-nav>
    <!-- 内容 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-nav": Nav
  },
  data() {
    return {
      poi_info: {},
      commentNum: 0
    };
  },
  created() {
    //使用es6自带的fetch请求数据
    fetch("api/goods")
      .then(res => {
        return res.json();
      })
      .then(response => {
        // console.log(response.data.poi_info);
        if (response.code == 0) {
          this.poi_info = response.data.poi_info;
        }
      });

    fetch("api/ratings")
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.code == 0) {
          this.commentNum = response.data.comment_num;
        }
      });
  }
};
</script>
<style>
</style>
