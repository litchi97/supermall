import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-type";


export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
      //如果有找到一样的数据，那么就返回该数据
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      }else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })

  }
}