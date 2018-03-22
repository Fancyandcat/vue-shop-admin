<template>
  <div class="login">
    <img :src="imgUrl" class="bg-img">
    <el-dialog
    :visible.sync="outerVisible"
    :close-on-press-escape="false"
    :show-close="false"
    :close-on-click-modal="false"
    width="40%">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="70px" class="demo-ruleForm">
        <el-form-item label="账号" prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="loginForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item class="t-c">
          <el-button type="primary" @click="submitForm('loginForm')">登 录</el-button>
          <el-button @click="resetForm('loginForm')">重 置</el-button>
          <el-button @click="loginOut">登出</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { imgsUrl } from 'common/js/imgsUrl'
import { resetObj } from 'common/js/common'
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
    this.imgUrl = imgsUrl[Math.floor(Math.random() * imgsUrl.length)]
  },
  methods: {
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
    // 登录方式
    loginByPwd () {
      this.$post('https://ipqwsvhf.api.lncld.net/1.1/login', {
        username: this.loginForm.name,
        password: this.loginForm.pwd
      }).then(res => {
        console.log('res', res)
        if (res && res.status === 200) {
          console.log('ress', res.status)
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({name: 'index'})
        }
      }).catch((res) => {
        this.$message({
          message: '账户或者密码错误',
          type: 'error'
        })
        resetObj(this.loginForm)
      })
    },
    // 登出
    loginOut () {
      window.AV.User.logOut()
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
