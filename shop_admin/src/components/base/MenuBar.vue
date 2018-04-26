<template>
  <el-col :span="4" class="menu-bar">
    <el-menu
      class="menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="vxCurrentMenu">
      <div v-for="(menu, index) in menuList" :key="index">
        <el-submenu v-if="menu.child && menu.child.length > 0" :index="menu.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(menuChild, index) in menu.child" :key="index" :index="menuChild.id" @click="handleMenu(menuChild.urlKey, menuChild.id)"><i class="el-icon-location"></i>{{menuChild.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="menu.id" @click="handleMenu(menu.urlKey, menu.id)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{menu.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </el-col>
</template>
<script>
import { menuList } from 'common/js/config'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      menuList: menuList
    }
  },
  created () {
    this.initCurrentMenu()
  },
  methods: {
    handleMenu (str, id) {
      this.setCurrentMenu(id)
      console.log(str)
      str && this.$emit('changeMenuRight', str)
    },
    initCurrentMenu () {
      console.log('id', this.vxCurrentMenu)
      // TODO 修复menu id
      // this.setCurrentMenu(menuList[0].id)
    },
    ...mapMutations('Basic', {
      'setCurrentMenu': 'SET_CURRENT_MENU'
    })
  },
  computed: {
    ...mapGetters('Basic', [
      'vxCurrentMenu'
    ])
  }
}
</script>
<style lang="stylus" scoped>
.menu-bar
  height 94%
  .menu-vertical
    height 100%
.appear-class
  transition all 10s ease
  transform translateX(-100px)
</style>
