<template>
  <div id="home" class="wrapper">
    <NarBar class="home-nav"><div slot="center" >购物街</div></NarBar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"
    ></tab-control>
    <scroll
        class="content"
        ref="scroll"
        :probe-type="3" @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="idShowBackTop"></back-top>
  </div>
</template>

<script>

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NarBar from "@/components/common/navbar/NarBar";
import TabControl from "@/components/content/tabControl/TabControl";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";
import {debounce} from "../../common/utils";

export default {
  name: "Home",
  components: {

    HomeSwiper,
    RecommendView,
    FeatureView,
    NarBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  data() {
    return {
      banners: [],
      recommends: [],
      // result: null
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      idShowBackTop: false,
      tabOffSetTop: 0,
      isTabFixed: false
    }
  },
  created() {
    //生命周期：一旦组件创建完就发送请求
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')



  },
  mounted() {
    //监听图片加载
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('itemImageLoad',() => {
     refresh()
    })
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type,) {
      //在原来page 的基础上+1
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //第二个page+1是我们保存的数据，我们保存了多少个page,此时才更新我们的this.goods[type].page
        //调用scroll的finishPullUp函数，封装在scroll.vue中
        //完成上拉加载
        this.$refs.scroll.finishPullUp()
      })
    },
    //监听事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break

      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      //拿到scroll组件，再拿组件内的属性scroll，再拿其方法scrollTo
      //封装之后直接调用方法
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      this.isTabFixed = (-position.y) > 611
      this.idShowBackTop = (-position.y) > 1000
    },
    //上拉加载更多
    // loadMore() {
    //   //对当前的页面进行加载
    //   this.getHomeGoods(this.currentType)
    //
    //   this.$refs.scroll.scroll.refresh()
    // }
    //防抖函数
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    //监听轮播图加载完毕

  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9999;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

}


/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
