<template>
  <div class="cart">
    <nar-bar class="nav-bar">
      <div slot="center">购物车（{{cartLength}}）</div>
    </nar-bar>
<!--    商品的列表-->
    <cart-list></cart-list>
<!--    底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>

import NarBar from "../../components/common/navbar/NarBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NarBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
      //   ...mapGetters({
      //     length: 'cartLength',
      //     list: 'cartList'
      //   })
      // }

    }
  }
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
  /*position: fixed;*/
  width: 100%;

}

</style>
