<template>
  <div></div>
</template>
<script>
import { routeObj } from 'common/js/config'
export default {
  data () {
    return {
      routeObj: routeObj
    }
  },
  created () {
    let str = this.$route.params.name
    console.log('name', str, routeObj[str])
    let str2route = routeObj[str]
    str && str2route && this.$router.push({name: str2route})
  }
}
</script>
