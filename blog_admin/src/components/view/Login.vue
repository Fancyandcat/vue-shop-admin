<template>
  <div class="login">
    <img :src="imgUrl" class="bg-img">
    <el-dialog
    title="商城管理系统后台"
    :visible.sync="outerVisible"
    :close-on-press-escape="false"
    :show-close="false"
    :close-on-click-modal="false"
    width="40%">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="70px" class="demo-ruleForm" >
        <el-form-item label="账号" prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="loginForm.pwd" type="password" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item class="t-c">
          <el-button type="primary" @click="submitForm('loginForm')">登 录</el-button>
          <el-button @click="resetForm('loginForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { imgsUrl } from 'common/js/imgsUrl'
import { ApiLoginIn, ApiLoginStatic } from 'api/login'
export default {
  data () {
    return {
      imgUrl: '',
      outerVisible: true,
      loginForm: {
        name: '',
        pwd: ''
      },
      rules: {
        name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.clearVuexInStorage()
    this.setBgByRandom()
    this.loginByAuto()
  },
  methods: {
    setBgByRandom () {
      this.imgUrl = imgsUrl[Math.floor(Math.random() * imgsUrl.length)]
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginByPwd()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    clearVuexInStorage () {
      window.sessionStorage.removeItem('vuex')
    },
    // 登录方式
    loginByPwd () {
      let that = this
      ApiLoginIn(this.loginForm.name, this.loginForm.pwd).then(function () {
        that.$message({
          message: '登录成功',
          type: 'success',
          duration: 1500
        })
        setTimeout(() => {
          that.$router.push({name: 'index'})
        }, 1000)
      }, function () {
        that.$message({
          message: '账户或者密码错误',
          type: 'error'
        })
        that.resetForm('loginForm')
      })
    },
    loginByAuto () {
      ApiLoginStatic() && this.$router.push({name: 'index'})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/common.styl'
.login
  .dialog-footer
    text-align center
  .bg-img
    width 100%
    height 100%
    background #010101
</style>
