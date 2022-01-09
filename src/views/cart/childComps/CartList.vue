<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
   <cart-list-item
       v-for="(item, index) in cartList"
       :key="index"
       :product="item">

   </cart-list-item>
  </scroll>


</div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex/dist/vuex.esm.browser";

export default {
  name: "CartList",
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh()

  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px);
}
.content {
  height: 100vh;
  overflow: hidden;
}

</style>