import  {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    //监听图片加载
    const refresh = debounce(this.$refs.scroll.refresh,500)

    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      //拿到scroll组件，再拿组件内的属性scroll，再拿其方法scrollTo
      //封装之后直接调用方法
      this.$refs.contentScroll.scrollTo(0,0, 300)
    }
  }
}

