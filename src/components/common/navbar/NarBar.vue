<template>
  <div class="nav-bar ignore">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>

  </div>
</template>

<script>
export default {
  name: "NarBar"
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgb(100,100,100,0.1);
  }
  .right, .left {
    width: 60px;
  }
  .center {
    flex: 1;

  }
</style>