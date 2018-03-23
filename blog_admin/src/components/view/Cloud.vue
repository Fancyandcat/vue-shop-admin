<template>
  <div class="cloud">
    <el-row class="tac">
      <nav-bar></nav-bar>
      <menu-bar @changeMenuRight="changeMenuRight"></menu-bar>
      <el-col :span="21" class="content-box">
        <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import NavBar from '@/components/base/NavBar'
import MenuBar from '@/components/base/MenuBar'
import { throttle } from 'common/js/throttle'
import { ApiLoginStatic } from 'api/login'
export default {
  components: {
    NavBar,
    MenuBar
  },
  data () {
    return {
      searchThrottleConfig: {
        timeFlag: true,
        throttleTimer: null
      }
    }
  },
  methods: {
    changeMenuRight (str) {
      let that = this
      return throttle(this.searchThrottleConfig, function () {
        that.changeRouteToBus(str)
      }, 600)
    },
    changeRouteToBus (str) {
      this.$router.push({name: 'bus', params: {name: str}})
    },
    changeRouteToLogin () {
      this.$router.push({name: 'login'})
    }
  },
  watch: {
    $route (to, from, next) {
      !ApiLoginStatic() && this.changeRouteToLogin()
    }
  }
}
</script>
<style lang="stylus" scoped>
.cloud
  height 100%
  .tac
    height 100%
  .content-box
    height 94%
.fade-enter-active,
.fade-leave-active
  transition opacity .3s
.fade-enter,
.fade-leave-active
  opacity 0
</style>
