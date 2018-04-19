// 获取分类，通过制定的id
export function ApiCategoryQuery (id) {
  let _category = new window.AV.Query('Category')
  return _category.get(id)
}

// 创建分类，使用category属性判断是否为顶级分类
export function ApiCategoryAdd (params, id) {
  if (!params || typeof params !== 'object') {
    return
  }
  let _category = null
  _category = window.AV.Object.createWithoutData('Category', id)
  let _subCategory = null
  if (params.parent) {
    _subCategory = window.AV.Object.createWithoutData('Category', params.parent)
    for (let k in params) {
      if (k === 'parent') {
        _category.set('parent', _subCategory)
      } else {
        _category.set(k, params[k])
      }
    }
  } else {
    for (let k in params) {
      _category.set(k, params[k])
    }
  }
  return _category.save()
}

// 删除顶级分类
export function ApiCategoryDelete (id) {
  let _category = window.AV.Object.createWithoutData('Category', id)
  return _category.destroy()
}
