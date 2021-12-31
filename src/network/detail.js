import {request} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.highNowPrice = itemInfo.highNowPrice
    this.highPrice = itemInfo.highPrice
    this.lowNowPrice = itemInfo.lowNowPrice
    this.lowPrice = itemInfo.lowPrice
    this.columns = columns
    this.services = services
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.goodsCount = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
