<!--
 * @Author: zn
 * @Date: 2022-01-18 18:30:49
 * @Description:专家登录
 * @LastEditors: SHUO
-->
<template>
  <div class="expert-login">
    <div>
      <el-form ref="dataForm" label-position="top" :model="dataForm" :rules="loginRules">
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="dataForm.username"
            placeholder="请输入用户名"
            type="text"
            autocomplete="on"
            prefix-icon="el-icon-user"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="dataForm.password"
            prefix-icon="el-icon-lock"
            autocomplete="on"
            type="password"
            placeholder="请输入密码"
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            size="large"
            @click.native.prevent="handlePwdLogin(4)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminForm',
  data() {
    return {
      dataForm: {
        username: '',
        password: '',
        loginType: 4,
        roleSign: 5
      },
      loading: false,
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码'
          }
        ]
      }
    }
  },
  mounted() {
    // 绑定键盘事件
    window.addEventListener('keydown', this.keyDown)
  },
  beforeDestroy() {
    // 销毁键盘事件
    window.removeEventListener('keydown', this.keyDown, false)
  },
  methods: {
    // 回车键登录
    keyDown(e) {
      if (e.keyCode === 13) {
        this.handlePwdLogin()
      }
    },
    // 密码登录
    handlePwdLogin() {
      if (this.loading) return
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.dataForm)
            .then(() => {
              this.$router.push({
                path: '/dashboard'
              })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$color: #266bf0;
.login-type {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 364px;
  line-height: 30px;
  font-size: #333333;
  width: 376px;
  background: #eaeef4;
  border-radius: 6px;
  padding: 6px;
  margin: auto;
  margin-bottom: 40px;
  li {
    width: 178px;
    padding-left: 57px;
    border-radius: 4px;
  }
  .login-active {
    color: $color;
    background: #ffffff;
  }
}
.forget {
  font-size: 12px;
  color: #999;
  text-align: right;
  width: 100%;
  margin-top: -15px;
  cursor: pointer;
}
::v-deep {
  .el-form {
    padding: 0 60px;
  }
  .el-input__inner {
    border: none;
    border-bottom: 1px solid #e8e8e8;
  }
  .el-button {
    width: 376px;
    background: $color;
    border-radius: 6px;
    font-size: 14px;
    color: #fff;
    margin-top: 35px;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 25px !important;
  }
  .el-form--label-top .el-form-item__label {
    color: $color;
  }
}
.login-form-QRCode {
  position: relative;
  // width: 180px;
  // height: 195px;
  // margin: auto;
  // border: 1px solid #e8e8e8;

  .qrcode-img {
    display: inline-block;
    position: relative;
    margin: 1.042vw;
    border: 1px solid #e8e8e8;
    margin: auto;
    left: 50%;
    transform: translate(-50%);
  }
}

.qrcode-tip,
.refresh {
  color: #999;
  line-height: 1.146vw;
  font-size: 0.833vw;
  text-align: center;
  margin-top: 35px;
  span {
    color: #333;
  }
}
.refresh {
  cursor: pointer;
  margin-top: 20px;
}
.footer-link {
  text-align: center;
  margin-left: 25px;
  color: #333333;
  margin-top: 35px;
  span {
    cursor: pointer;
    margin-right: 24px;
  }
}
.code-login,
.expert-login {
  margin-top: 80px;
}
</style>
