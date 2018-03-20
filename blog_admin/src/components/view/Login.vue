<template>
  <div class="login">
    <img :src="imgUrl" class="bg-img">
    <el-dialog
    :visible.sync="outerVisible"
    :close-on-press-escape="false"
    :show-close="false"
    :close-on-click-modal="false"
    width="40%">
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">重 置</el-button>
        <el-button type="primary" @click="innerVisible = true">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { imgsUrl } from 'common/js/imgsUrl'
export default {
  data () {
    return {
      imgUrl: '',
      outerVisible: true,
      innerVisible: false
    }
  },
  created () {
    this.imgUrl = imgsUrl[Math.floor(Math.random() * imgsUrl.length)]
  },
  methods: {
    handleClose () {
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  .dialog-footer
    text-align center
  .bg-img
    width 100%
    height 100%
    background #010101
</style>
