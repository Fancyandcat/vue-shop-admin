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

// 获取商品顶级分类
export async function ApiGoodsCategory () {
  let query = new window.AV.Query('Category')
  let categoris = []
  query.equalTo('parent', null)
  await query.find().then((c) => {
    c.forEach((element, index) => {
      categoris.push({})
      let aquery = new window.AV.Query('Category')
      aquery.equalTo('parent', element)
      aquery.find().then((s) => {
        categoris[index][element.attributes.title] = s.map(item => {
          return item.attributes
        })
      })
    })
  })
  return categoris
}
