<template>
<div id="detail">
  <detail-nav-bar class="navbar"></detail-nav-bar>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    <detail-goods-param :goods-param="goodsParam"></detail-goods-param>
    <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
  </scroll>
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailGoodsParam from "./childComps/DetailGoodsParam";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import {getDetail, Goods, Shop, GoodsParam} from "../../network/detail";


export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo

  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo:{}
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
      //取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list
      }
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
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