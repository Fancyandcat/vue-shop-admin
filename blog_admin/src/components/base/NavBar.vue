<template>
  <div class="nav-bar">
    <el-row type="flex" class="row-bg" justify="end" align="middle">
      <el-col :span="2">
        <el-dropdown trigger="click"  @command="handleCommand">
          <p class="el-dropdown-link" >
            点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix" command="info">
              个人信息
            </el-dropdown-item>
            <el-dropdown-item class="clearfix" command="loginOut">
              退出账号
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ApiLoginOut } from 'api/login'
export default {
  deta () {
    return {
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginOut') {
        this.loginOut()
      } else if (command === 'info') {
        this.changeRouteToInfo()
      }
    },
    loginOut () {
      ApiLoginOut()
      this.$router.push({ name: 'login' })
    },
    changeRouteToInfo () {
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/baseColor.styl'
.nav-bar
  height 6%
  background:linear-gradient(to left,#292929,#acb5bc,#292929)
  box-shadow 0 10px 15px #E4E7ED
  .row-bg
    height 100%
    .el-dropdown-link
      color $color-index-gray
      cursor pointer
</style>
