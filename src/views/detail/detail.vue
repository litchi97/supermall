<template>
<div id="detail">
  <detail-nav-bar class="navbar" @tabClick="tabClick" ref="nav"></detail-nav-bar>
  <scroll class="content"
          ref="scroll"
          @scroll="contentScroll"
          :probe-type="3" >
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>

    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-goods-param :goods-param="goodsParam" ref="params"></detail-goods-param>
    <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommend"></goods-list>

  </scroll>
  <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";


import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailGoodsParam from "./childComps/DetailGoodsParam";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
import {backTopMixin} from "../../common/mixin";

import { mapActions } from "vuex"



export default {
  name: "detail",
  mixins: [backTopMixin],

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,



  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      imgItemListener: null,
      //获取到每个组件距离顶部的值，存储到数据中，点击的时候 拿出对应索引的值
      themeTopYs:[],
      currentIndex: 0,


    }
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      console.log(res);
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      this.shop = new Shop(data.shopInfo)
      //获取商品的详细信息
      this.detailInfo = data.detailInfo
      //获取衣服的信息
      this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      this.commentInfo = data.rate


      //取出评论信息

    //   let data = res.result;
    //   // 获取顶部轮播图
    //   this.topImages = data.itemInfo.topImages;
    //   // 获取商品的基本信息
    //   this.baseInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
    //   // 获取商家信息
    //   this.shopInfo = new Shop(data.shopInfo);
    //   // 获取商品图片信息
    //   this.goodsInfo = data.detailInfo;
    //   // 获取商品参数信息
    //   this.goodsParams = data.itemParams
    //   //获取评论信息
    //   this.commentInfo = data.rate;
    // }).catch(err=>{
    //   console.log('Whoops,something bad happened~');
    })

    //获取评论数据
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()

      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)

    },
    //跳转至对应的板块
    tabClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position) {
      //获取距离
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        // if(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
        //   console.log(i)
        // if(this.currentIndex !== i && ((i < length - 1 && (positionY >= this.themeTopYs[i]) && positionY < this.themeTopYs[i + 1])
        //     || (i === length - 1 && positionY> this.themeTopYs[i]))) {
        if(this.currentIndex !== i && ((i < length - 1 && (positionY >= this.themeTopYs[i]) && positionY < this.themeTopYs[i + 1]))){
          this.currentIndex = i
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

        this.isShowBackTop = (-position.y) > 1000
      //将距离与模块中的值进行对比

    },
    addToCart() {
      //获取购物车需要展示的信息，对象的形式
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.iid = this.iid;
      product.price = this.goods.realPrice;
      // console.log(product)
      this.addCart(product).then(res => {
       //  this.isShow = true;
       //  this.message = res;
       // setTimeout(() => {
       //   this.isShow = false;
       //   this.message = ''
       // },1500)
        this.$toast.show('添加了一件商品',1500)
      })
      //将商品添加购物车里 vuex

      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res)
      // })

    }
  },
  destroyed() {
    // 取消详情页推荐商品事件总线的监听，与首页商品列表区分开
    this.$bus.$off('itemImgLoad', this.imgItemListener);
  },

}
</script>

<style scoped>
.navbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>