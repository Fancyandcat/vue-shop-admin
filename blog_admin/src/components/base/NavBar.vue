<template>
  <div class="nav-bar" style="background-color: #1F262e">
    <el-row type="flex" class="row-bg" justify="end" align="middle">
      <el-col :span="2">
        <el-dropdown trigger="click">
          <p class="el-dropdown-link">
            点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              评论
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              回复
              <el-badge class="mark" :value="3" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  deta () {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/baseColor.styl'
.nav-bar
  height 6%
  .row-bg
    height 100%
    .el-dropdown-link
      color $color-index-gray
</style>
