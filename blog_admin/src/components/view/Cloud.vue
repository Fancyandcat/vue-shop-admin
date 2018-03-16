<template>
  <div class="cloud">
    <el-row class="tac">
      <nav-bar></nav-bar>
      <menu-bar></menu-bar>
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
  }
}
</script>
<style lang="stylus" scoped>
.cloud
  height 100%
  .tac
    height 100%
</style>
