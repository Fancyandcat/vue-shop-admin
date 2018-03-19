// 菜单列表
export const menuList = [{
  name: '主页',
  urlKey: '主页',
  id: '0'
}, {
  name: '我的博客',
  id: '00',
  child: [{
    name: '增加',
    id: '000'
  }, {
    name: '查看',
    urlKey: '博客列表',
    id: '001'
  }]
}, {
  name: '我的列表',
  id: '01',
  child: [{
    name: '增加',
    id: '010'
  }, {
    name: '查看',
    id: '011'
  }]
}, {
  name: '我的生活',
  id: '02',
  child: [{
    name: '增加',
    id: '020'
  }, {
    name: '查看',
    id: '021'
  }]
}, {
  name: '我的留言板',
  id: '03'
}]

// 路由列表
export const routeObj = {
  '主页': 'index',
  '博客列表': 'blog-list'
}
