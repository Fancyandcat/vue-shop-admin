<template>
  <div class="cloud">
    <el-row class="tac">
      <nav-bar></nav-bar>
      <menu-bar @changeMenuRight="changeMenuRight"></menu-bar>
      <el-col :span="21" class="content-box">
        <div class="content-wrapper">
          <transition name="fade" mode="out-in" appear>
            <router-view @changeContent="changeRouteToBus"></router-view>
          </transition>
        </div>
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
    padding 30px 10px
    .content-wrapper
      height 100%
      width 100%
      border 1px solid #eef4f8
      box-shadow 0 0 15px #b8becc
      position relative
      border-radius: 5px
      padding 20px
      overflow auto
      &::-webkit-scrollbar
        width: 10px
        height: 5px
        -webkit-border-radius: 4px
      &::-webkit-scrollbar-thumb
        background-color: #ccc
        -webkit-border-radius: 4px
      &::-webkit-scrollbar-thumb:hover
        background-color: #ccc
        -webkit-border-radius: 4px
      &::-webkit-scrollbar-track-piece
        height: 20px
        -webkit-border-radius: 4px
.fade-enter-active,
.fade-leave-active
  transition opacity .3s
.fade-enter,
.fade-leave-active
  opacity 0
</style>
