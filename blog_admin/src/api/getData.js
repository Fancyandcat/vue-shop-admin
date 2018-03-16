import { URL, uriObj } from 'api/config.js'
import { uri, uri2, uri1 } from '@/api/loginUri'
import axios from 'axios'
const qs = require('qs')

axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    window.vue.$message({
      type: 'error',
      message: '系统错误，请稍后再试或向客服反馈'
    })
    return
  }
  if (!res.data.success) {
    if (res.data.error.code === 'request.token.invalid') {
      window.location.href = uri2
    } else if (res.data.error.message === '当前用户无访问权限' || res.data.error.message === '当前模块暂无权限') {
      window.vue.$message({
        type: 'error',
        message: res.data.error.message
      })
      window.location.href = `${uri1}/#/cloud/index`
      // setTimeout(() => {
      //   window.location.reload()
      // }, 500)
      return false
    } else {
      window.vue.$message({
        type: 'error',
        message: res.data.error.message
      })
      return res
    }
  }
  return res
}, function (error) {
  return Promise.reject(error)
})
let timer = false
export function getData(app, method, params = {}) {
  var token = sessionStorage.getItem('token')
  let url = `${URL}${uriObj[app]}/v3/${method}?${Date.now()}`
  let data = Object.assign({ 'token': token }, params)
  let online = navigator.onLine
  if (!online) {
    if (timer) return axios.post(url, qs.stringify(data))
    timer = true
    window.vue.$message({
      type: 'error',
      message: '通讯异常，请检查网络连接'
    })
    setTimeout(() => {
      timer = false
    }, 3000)
  }
  if (method !== 'self.profile.get') {
    let id = localStorage.getItem('loginMore')
    let idOld = sessionStorage.getItem('loginMore1')
    if (id !== 'null' && id !== 'undefined' && id !== '') {
      if (id !== idOld) {
        window.vue.$message({
          type: 'error',
          message: '您已登录其它账号，当前操作无法提交！'
        })
        setTimeout(() => {
          window.location.href = uri1
        }, 500)
        return
      }
    }
  }

  return axios.post(url, qs.stringify(data))
}

export function getEnum(obj, fn) {
  getData('user', 'enum.public.get').then((res) => {
    let data = res.data.data[1].items || []
    data.forEach((ele, index) => {
      obj[ele.const] = ele.name
    })
    return getData('user', 'enum.user.get')
  })
    .then((res) => {
      let data = res.data.data
      data.forEach((ele, index) => {
        data = ele.items
        data.forEach((ele, index) => {
          obj[ele.const] = ele.name
        })
      })
      obj.DISABLED = '停用'
      let roleObj = {
        'STUDENT': '学生',
        'PARENT': '家长',
        'PSY_TEACHER': '心理老师',
        'CLASS_TEACHER': '班主任',
        'TEACHER': '教职工',
        'MANAGER': '校级管理员',
        'EDUCATION_MANAGER': '教育局',
        'FEMALE': '女',
        'MALE': '男',
        'HEADMASTER': '校长',
        'SELF': '本人',
        'GENERAL': '通用'
      }
      obj = Object.assign(obj, roleObj)
      if (fn) {
        fn()
      }
    })
}

export function getToken() {
  let qs = require('qs')
  axios.post(uri + 'token.get', qs.stringify({
    appKey: '22222222'
  }), { withCredentials: true }).then((res) => {
    let data = res.data
    if (data.success === true) {
      sessionStorage.setItem('token', data.token)
    }
  })
}

export function getIssueData(url, params = {}) {
  let token = sessionStorage.getItem('token')
  let data = Object.assign({ 'token': token }, params)
  return axios.post(url, qs.stringify(data))
}
