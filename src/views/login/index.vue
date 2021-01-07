<template>
    <div class="login-container">
        <!-- 表单组件 -->
        <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
            <p class="login-head">小放头条</p>
            <el-form-item prop="mobile">
                <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="user.code" placeholder="请输入验证码" ></el-input>
            </el-form-item>
            <el-form-item prop="checked">
                 <el-checkbox v-model="user.checked">我已经阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="login-button" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>

<script>
import { Form, Button, Input, FormItem, Checkbox, Message } from 'element-ui'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { login } from '@/api/user.js'

Vue.use(Form).use(Button).use(Input).use(FormItem).use(Checkbox)

Vue.prototype.$message = Message

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        checked: false // 是否同意用户协议
      },
      loginLoading: false, // 登录按钮状态
      formRules: {
        // 验证手机号
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9|4]\d{9}$/, message: '请输入正确的手机号码格式' }
        ],
        // 验证验证码
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        // 验证用户协议
        checked: [
          {
            // 自定义验证规则
            validator: (rule, value, callback) => {
              if (value) {
                // 验证通过
                callback()
              } else {
                // 验证失败
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 用户登录事件
    onLogin () {
      // 获取输入用户名和验证码
    //   const user = this.user
      // 验证输入用户名和验证码
      this.$refs['login-form'].validate((valid) => {
        if (!valid) {
          return
        }
        // 提交登录，验证数据
        this.loginLoading = true // 改变登录按钮状态
        login(this.user).then(res => {
          console.log(res)
          // 登录成功
          this.$message({
            message: '登录成功!',
            type: 'success'
          })
          this.loginLoading = false // 还原登录按钮状态
          // 页面跳转
          this.$router.push('/')
        }).catch(err => {
          console.log('登录失败', err)
          // 登录失败
          this.$message.error('登录失败，手机号或验证码错误!')
          this.loginLoading = false // 还原登录按钮状态
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('./img/login_bg.jpg') no-repeat;
    background-size: cover;
    .login-form {
        padding: 50px;
        width: 250px;
        height: 200px;
        background-color: #fff;
        .login-head {
            margin: 0;
            margin-top: -38px;
            margin-bottom: 10px;
            color: #409eff;
            font-size: 30px;
            text-align: center;
        }
        .login-button {
            width: 100%;
        }
        .el-form-item {
            margin-bottom: 20px;
        }
    }
}
</style>
