export function ApiCategoryAdd (params) {
  if (!params || typeof params !== 'object') {
    return
  }
  let _category = window.AV.Object.createWithoutData('Category')
  for (let k in params) {
    _category.set(k, params[k])
  }
  return _category.save()
}
