// 获取商品列表页码
export function ApiGoodsCountPage () {
  let query = new window.AV.Query('Goods')
  return query.find()
}

// 获取商品列表
export function ApiGoodsList (pageMsg) {
  let query = new window.AV.Query('Goods')
  query.include('category')
  query.limit(pageMsg.pageSize)
  query.skip(pageMsg.pageSize * (pageMsg.pageNum - 1))
  return query.find()
}

// 为获取顶级分类提供服务，请勿在外部调用 src:https://segmentfault.com/a/1190000007535316
function __ApiGetGoodsC () {
  let query = new window.AV.Query('Category')
  query.equalTo('parent', null)
  return query.find().then(res => {
    return res
  })
}
function __ApiGetGoodsSubByC (c) {
  let aquery = new window.AV.Query('Category')
  aquery.equalTo('parent', c)
  return aquery.find().then(res => {
    return res.map(result => {
      return result.attributes
    })
  })
}
// 获取商品顶级分类
export async function ApiGoodsCategory () {
  let categoris = []
  let s = await __ApiGetGoodsC()
  for (let i = 0; i < s.length; i++) {
    categoris.push({})
    categoris[i].title = s[i].attributes.title
    categoris[i].children = await __ApiGetGoodsSubByC(s[i])
  }
  return categoris
}
