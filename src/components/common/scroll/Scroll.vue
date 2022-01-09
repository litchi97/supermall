<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>

</div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type:Number,
      default: 0
      //default默认值为数组或对象时，使用函数。其他类型则是这种写法
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeDOM:true,
        click: true

      }),

       this.scroll.on('scroll',(position) => {
            // console.log(position)
          })
      //上拉检测监听
      // this.scroll.on('pullingUp',() => {
      //   this.$emit('pullingUp')
      // })
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position)
      })
      //监听滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    })

  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll &&  this.scroll.finishPullUp()
    },
    refresh() {
      console.log('111')
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>