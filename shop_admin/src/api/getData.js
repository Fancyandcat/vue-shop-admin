import axios from 'axios'
import BASEDATA from './config'
// const qs = require('qs')
const COMMON_HEADERS = {
  'X-LC-Id': BASEDATA.appInfo.appId,
  'X-LC-Key': BASEDATA.appInfo.appKey,
  'Content-Type': 'application/json'
}
axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    console.log('shibaiss', res)
    return
  }
  return res
}, function (error) {
  console.log('shibai', error)
  return Promise.reject(error)
})

export function getDataPost (url, data, headers) {
  !headers && (headers = COMMON_HEADERS)
  console.log('headers', headers)
  return axios.post(url, JSON.stringify(data), {headers: headers})
}

export function getDataGet (url, headers) {
  !headers && (headers = COMMON_HEADERS)
  console.log('headers', headers)
  return axios.get(url, { headers: headers })
}
