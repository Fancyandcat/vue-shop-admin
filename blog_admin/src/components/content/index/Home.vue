<template>
  <div>
    <button @click="addData">click</button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
  },
  methods: {
    addData () {
      // 测试一下能不能正常请求别的数据
      let obj = {
        where: {
          objectId: '5ab3460d17d0096887686799'
        },
        limit: 1
      }
      console.log('canshu', this.setGetParamsToStr(obj))
      let a = new window.AV.User()
      console.log(a.current())
      // this.$get('https://ipqwsvhf.api.lncld.net/1.1/classes/TestObject?' + this.setGetParamsToStr(obj)).then((res) => {
      //   console.log(res)
      // })
    },
    setGetParamsToStr (obj) {
      let str = ''
      let paramsObj = JSON.parse(JSON.stringify(obj))
      for (let k in paramsObj) {
        if (typeof paramsObj[k] === 'object') {
          str = str + k + '=' + JSON.stringify(paramsObj[k]) + '&'
        } else {
          str = str + k + '=' + paramsObj[k] + '&'
        }
      }
      return str.substring(0, str.length - 1)
    }
  }
}
</script>
