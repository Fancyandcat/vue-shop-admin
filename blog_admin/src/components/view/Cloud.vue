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
export default {
  components: {
    NavBar,
    MenuBar
  },
  deta () {
    return {
    }
  },
  methods: {
    changeMenuRight (str) {
      this.$router.push({name: 'bus', params: {name: str}})
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
