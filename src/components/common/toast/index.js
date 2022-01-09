import Toast from "./Toast";
const obj = {}

obj.install = function (Vue) {
  //创建组件构造器
  const toastConstrutor = Vue.extend(Toast)
  //new的方式，根据组件构造器，创建出来一个组件对象
  const toast = new toastConstrutor()
  //将组件对象，手动挂载到一个元素上
  toast.$mount(document.createElement('div'))
  //toast.$el对应的就是div,现在可以把toast加入到doc.body上
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
export  default obj