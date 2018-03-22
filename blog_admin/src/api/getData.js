import axios from 'axios'
import BASEDATA from './config'
// const qs = require('qs')
const headers = {
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

export function getDataPost (url, data) {
  return axios.post(url, JSON.stringify(data), {headers: headers})
}

export function getDataGet (url, data) {
  return axios.get(url, JSON.stringify(data), { headers: headers })
}
