// 将对象里属性清空 简单
export function resetObj (obj) {
  if (typeof obj !== 'object') {
    return
  }
  for (let k in obj) {
    obj[k] = ''
  }
}
