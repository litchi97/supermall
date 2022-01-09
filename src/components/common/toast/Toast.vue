<template>
  <div class="toast" v-show="isShow">
    <div >{{message}}</div>
  </div>
</template>

<script>

export default {
  name: "Toast",
  props: {
  },
  data() {
    return {
      isShow: false,
      message: ''
    }
  },
  methods: {
    show(message='默认文字', duration=2000) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.message = ''
        this.isShow = false
      },duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 20px;
  padding: 8px 10px;
  background-color: rgba(0,0,0,.8);
  border-radius: 10%;
  z-index: 999;
  color: #fff;
}
</style>