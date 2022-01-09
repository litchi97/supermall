<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" alt="" :class={check:isCheck}>
  </div>
</template>

<script>
export default {
  name: "CheckButtom",
  props: {
    isCheck: {
      type:Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button {
  background-color: #C0C0C0;
  border-radius: 50%;
  border: 2px solid #C0C0C0;
}
.check {
  background-color: #CD5C5C;
  border-radius: 50%;
  border: 2px solid #CD5C5C;
}
</style>