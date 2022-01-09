<template>
  <div class="bottom-bar">
    <div class="content">
      <check-buttom class="check-area"
                    :is-check="isSelectAll"
                    @click.native="SelectAll"></check-buttom>
      <span>全选</span>
    </div>
    <div class="price" >
      合计：￥{{totalPrice}}
    </div>

    <div class="calculate" @click="CalcClick">去结算:{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButtom from "../../../components/content/checkButtom/CheckButtom";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButtom
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.$store.getters.cartList.filter(item => {
        return item.check
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkLength() {
      return this.cartList.filter(item => item.check).length
    },
    isSelectAll() {
      //通过没有选中的状态，如果存在没有选中的，那么length就不会是0
      // return !(this.cartList.filter(item => !item.check).length)

      // if(this.cartList.length === 0) return false
      // else {
      //   return !this.cartList.find(item => !item.check)
      // }

      return this.cartList.length !== 0 && this.cartList.every(item => item.check)
    }
  },
  methods: {
    SelectAll() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.check = false)
      }else {
        this.cartList.forEach((item => item.check = true))
      }
      //这样的方法看似简化，但是实际上是不行的，因为在遍历的过程会相互影响
      // this.cartList.forEach((item => item.check = !this.isSelectAll))
    },
    CalcClick() {
      console.log('111')
      this.$toast.show('请添加商品后结算')
    }

  }
}
</script>

<style scoped>
.bottom-bar {
  background-color: 	#D8BFD8;
  height: 40px;
  position: relative;
  bottom: 40px;
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 17px;
}
.content {
  display: flex;
  position: relative;

}
.check-area {
  height: 20px;
  width: 25%;
  align-items: center;
  margin-left: 10px;
  justify-content: center;

}
.content span {

  text-align: center;
  margin-left: 5px;
}
.price {
  margin-left: 20px;
  text-align: center;
  align-items: center;
  width: 50%;
}
.calculate {
  margin-left: 20px;
  width: 25%;
  line-height: 40px;
  background-color: #9370D8;
  text-align:center;


}

</style>