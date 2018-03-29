export function ApiGoodsCountPage () {
  let query = new window.AV.Query('Goods')
  return query.find()
}

export function ApiGoodsList (pageMsg) {
  let query = new window.AV.Query('Goods')
  query.limit(pageMsg.pageSize)
  query.skip(pageMsg.pageSize * (pageMsg.pageNum - 1))
  return query.find()
}
