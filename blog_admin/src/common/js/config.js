// 菜单列表
export const menuList = [{
  name: '主页',
  urlKey: '主页',
  id: '0'
}, {
  name: '商品管理',
  id: '00',
  child: [{
    name: '商品列表',
    urlKey: '商品列表',
    id: '000'
  }, {
    name: '商品分类',
    id: '001'
  }]
}, {
  name: '订单管理',
  id: '01',
  child: [{
    name: '订单列表',
    id: '010'
  }]
}, {
  name: '消息管理',
  id: '02',
  child: [{
    name: '暂未开启',
    id: '020'
  }]
}]

// 路由列表
export const routeObj = {
  '主页': 'index',
  '商品列表': 'goods-list'
}
