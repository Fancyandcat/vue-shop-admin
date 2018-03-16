<template>
  <div class="menu-bar">
    <el-col :span="3" style="height: 100%">
      <el-menu
        class="menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu v-for="(menu, index) in menuList"
        :index="menu.id" :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item-group v-if="menu.child && menu.child.length > 0">
            <template slot="title">分组一</template>
            <el-menu-item v-for="(menuChild, index) in menu.child" :key="index" :index="menuChild.id">{{menuChild.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
import { menuList } from 'common/js/config'
export default {
  data () {
    return {
      menuList: menuList
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="stylus" scoped>
.menu-bar
  height 94%
  .menu-vertical
    height 100%
</style>
