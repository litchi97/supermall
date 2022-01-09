<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goods-item="item"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";


export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      },
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
  /*  会根据内容的宽度自动设置一行当中显示几个*/
    justify-content: space-around;
    padding: 2px;
  }

</style>