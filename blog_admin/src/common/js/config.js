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
    urlKey: '商品分类',
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

function __menuList (menuList) {
  let list = {}
  for (let index = 0; index < menuList.length; index++) {
    const element = menuList[index]
    list[element.name] = element.id
    if (element.child) {
      for (let _index = 0; _index < element.child.length; _index++) {
        const _element = element.child[_index]
        list[_element.name] = _element.id
      }
    }
  }
  return list
}

export const str2menuIdObj = __menuList(menuList)

// 路由列表
export const routeObj = {
  '主页': 'index',
  '商品列表': 'goods-list',
  '添加商品': 'goods-add',
  '修改商品': 'goods-edit',
  '商品分类': 'category-list'
}

// 路由名字，用于面包屑
export const routeName = {
  'index': {
    name: '主页'
  },
  'goods': {
    name: '商品列表',
    add: '新增商品',
    edit: '修改商品'
  },
  'category': {
    name: '商品分类'
  }
}
