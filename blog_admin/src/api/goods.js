// 获取商品列表页码
export function ApiGoodsCountPage () {
  let _query = new window.AV.Query('Goods')
  return _query.find()
}

// 获取商品列表
export function ApiGoodsList (pageMsg) {
  let _query = new window.AV.Query('Goods')
  _query.include('category')
  _query.descending('createdAt')
  _query.limit(pageMsg.pageSize)
  _query.skip(pageMsg.pageSize * (pageMsg.pageNum - 1))
  return _query.find()
}

// 为获取顶级分类提供服务，请勿在外部调用 src:https://segmentfault.com/a/1190000007535316
function __ApiGetGoodsC () {
  let _query = new window.AV.Query('Category')
  _query.equalTo('parent', null)
  return _query.find().then(res => {
    console.log(res)
    return res.map(result => {
      return Object.assign(result, {objectId: result.id})
    })
  })
}
function __ApiGetGoodsSubByC (c) {
  let _query = new window.AV.Query('Category')
  _query.equalTo('parent', c)
  return _query.find().then(res => {
    return res.map(result => {
      return Object.assign({}, result.attributes, {objectId: result.id})
    })
  })
}
// 获取商品顶级分类
export async function ApiGoodsCategory () {
  let _categoris = []
  let _s = await __ApiGetGoodsC()
  console.log('s', _s)
  for (let i = 0; i < _s.length; i++) {
    _categoris.push({})
    _categoris[i].title = _s[i].attributes.title
    _categoris[i].objectId = _s[i].objectId
    _categoris[i].children = await __ApiGetGoodsSubByC(_s[i])
  }
  return _categoris
}
// 上传产品图片
/**
 * params: name 文件名字 file 要上传的文件对象
 */
export function ApiGoodsProUpload (name, file) {
  let _file = new window.AV.File(name, file)
  return _file.save()
}
// 新增商品
export function ApiGoodsAdd (params) {
  if (!params || typeof params !== 'object') {
    return
  }
  let _good = window.AV.Object.createWithoutData('Goods')
  let _category = window.AV.Object.createWithoutData('Category', params.category)
  for (let k in params) {
    if (k === 'category') {
      _good.set(k, _category)
    } else {
      _good.set(k, params[k])
    }
  }
  return _good.save()
}
// 删除商品
export function ApiGoodsDelete (id) {
  let _good = window.AV.Object.createWithoutData('Goods', id)
  console.log(_good)
  return _good.destroy()
}
// 获取商品
export function ApiGoodsQuery (id) {
  let _query = new window.AV.Query('Goods')
  return _query.get(id)
}
// 更新商品
export function ApiGoodsEdit (params, id) {
  if (!params || typeof params !== 'object' || !id) {
    return
  }
  let _good = window.AV.Object.createWithoutData('Goods', id)
  let _category = window.AV.Object.createWithoutData('Category', params.category)
  for (let k in params) {
    if (k === 'category') {
      _good.set(k, _category)
    } else {
      _good.set(k, params[k])
    }
  }
  return _good.save()
}
