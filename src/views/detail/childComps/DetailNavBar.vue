<template>
  <div>
    <nar-bar>
      <div slot="left" class="back" @click="BackClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title"
             class="title-item"
             :class="{active:index === currentIndex}"
             @click="isClick(index)">{{item}}</div>
      </div>
    </nar-bar>
  </div>
</template>

<script>
import NarBar from "../../../components/common/navbar/NarBar";
export default {
  name: "DetailNavBar",
  components: {
    NarBar
  },
  data () {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    isClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    },
    BackClick() {
      this.$router.back()
    },
  }
}

</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
  background-color: #fff;
}
.title-item {
  flex:1
}
.active {
  color:hotpink;
}
.back img{
  padding-top: 12px;
}
</style>