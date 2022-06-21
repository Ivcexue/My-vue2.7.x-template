<template>
  <div class="login-container">
    <!-- 父盒子 -->
    <div class="login-cont w1200">
      <!-- logo -->
      <div class="logo">
        <img class="logo-img" :src="orgInfo.logoUrl1" />
        <span class="logo-title">{{ orgInfo.logoName }}</span>
      </div>
      <!-- 主体 -->

      <div class="mian">
        <div class="l">
          <div class="text-cont">
            <div class="title">{{ orgInfo.logoName }}</div>
            <div class="text">专业的 · 电子招标采购交易平台</div>
          </div>
          <div class="carousel-cont">
            <el-carousel height="17.708333vw">
              <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                <img :src="item.url" alt />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="r">
          <div class="login-right">
            <div class="login-form">
              <div class="form-view new-box">
                <!-- 头部tabs切换 -->
                <div class="tab-box">
                  <div>财务人员登录</div>
                </div>
                <!-- 登录表单 -->
                <div class="login-form-box new-login-form-box">
                  <admin-form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 版权 -->
      <div class="copyright" @click="onGoBeiAnPage">
        京ICP备18053516号-2 法正智能科技有限公司 提供技术支持
      </div>
    </div>
  </div>
</template>

<script>
import AdminForm from './component/AdminForm'

export default {
  name: 'AdminLogin',
  components: { AdminForm },
  data() {
    return {
      // 静态bannerList
      bannerList: [
        {
          url: require('@/assets/login/banner1.png')
        },
        {
          url: require('@/assets/login/banner2.png')
        },
        {
          url: require('@/assets/login/banner3.png')
        },
        {
          url: require('@/assets/login/banner4.png')
        }
      ],
      orgInfo: {}
    }
  },
  methods: {
    // 去备案网
    onGoBeiAnPage() {
      window.open('https://beian.miit.gov.cn')
    }
  }
}
</script>

<style lang="scss" scoped>
// 修改轮播图指示点样式 开始
::v-deep .el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

::v-deep .is-active {
  .el-carousel__button {
    width: 16px;
    height: 8px;
    border-radius: 4px;
    background: #fff;
  }
}
// 修改轮播图指示点样式 结束

// 版心
.w1200 {
  margin: 0 auto;
  width: 1200px;
}

// 新修改样式开始

.login-container {
  height: 100%;
  background-image: url('~@/assets/login/login-fullScreen-bg.png');
  background-size: cover;
}

.login-cont {
  padding-top: 70px;

  .logo {
    .logo-img {
      width: 44px;
      height: 44px;
    }
    .logo-title {
      font-size: 22px;
      font-weight: 700;
      color: #26272b;
    }
  }

  .mian {
    margin-top: 116px;
    height: 516px;

    display: flex;
    justify-content: space-between;

    .l {
      width: 640px;
      display: flex;
      flex-direction: column;

      .text-cont {
        flex: 1;
        .title {
          font-size: 36px;
          color: #2e3242;
          font-weight: 700;
        }
        .text {
          margin-top: 20px;
          font-size: 20px;
          color: #808091;
        }
      }

      .carousel-cont {
        border-radius: 10px;
        overflow: hidden;
        height: 340px;

        img {
          height: 340px;
        }
      }
    }

    .r {
      width: 460px;
      background: #ffffff;
      box-shadow: 0px 0px 20px 0px rgba(153, 153, 153, 0.1);
      border-radius: 10px;
    }
  }

  .copyright {
    margin-top: 40px;
    text-align: center;
    font-size: 13px;
  }
}

.new-box {
  display: flex;
  flex-direction: column;
}

.new-login-form-box {
  height: 100%;
  display: flex;
  justify-content: center;
}

// 新修改样式结束

.login-container {
  .logo-box {
    padding: 80px 360px 0;
    width: 100%;
    img {
      width: 334px;
      height: 36px;
    }
  }

  .logo-cont {
    // background: pink;
    img {
      width: 334px;
      height: 36px;
    }
  }

  .center-cont {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .mian-box {
      margin-top: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .left {
      .left-title {
        font-size: 36px;
        font-weight: 700;
        color: #2e3242;
        margin-bottom: 20px;
      }
      .left-text {
        color: #808091;
        font-size: 20px;
      }
      .left-carousel {
        border-radius: 10px;
        overflow: hidden;
        margin-top: 70px;
        width: 640px;
        height: 343px;
        .carousel-item-cont {
          height: 100%;
          background: pink;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }

    .right {
      border-radius: 10px;
      overflow: hidden;
      margin-left: 100px;
      background: #fff;
      box-shadow: 0px 0px 20px 0px rgba(153, 153, 153, 0.1);
      width: 460px;
      height: 516px;
      display: flex;
      justify-content: center;
      align-items: center;

      .login-form {
        display: flex;
        justify-content: center;
        // margin-left: 53px;
        width: 100%;
        height: 100%;
      }
    }
  }

  .copyright {
    cursor: pointer;
    padding-bottom: 40px;
    color: #717981;
    text-align: center;
    font-size: 13px;
  }

  // 修改结束

  .login-left {
    flex: 1;
    height: 100%;

    .logo {
      width: 334px;
      height: 36px;

      margin-top: 82px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .plat-view {
      margin-top: 190px;
      .line {
        width: 60px;
        height: 4px;
        background: #ffffff;
        margin-bottom: 45px;
      }
      .plat-info {
        font-size: 16px;
        font-family: MicrosoftYaHeiSemibold;
        color: #ffffff;
        line-height: 36px;
        .plat-title {
          font-size: 30px;
          line-height: 40px;
        }
        .text {
          font-size: 20px;
          line-height: 27px;
          margin-top: 10px;
          span {
            margin-right: 15px;
          }
        }
        .info {
          width: 490px;
          // font-size: 16px;
          font-family: MicrosoftYaHeiSemibold;
          color: #ffffff;
          line-height: 36px;
          margin-top: 20px;
        }
      }
      // .
    }

    .login-left-title {
      margin: 164px 0 20px 0;
      font-size: 36px;
      font-weight: 700;
    }
    .login-left-text {
      color: #808091;
      font-size: 20px;
    }
    .login-left-carousel {
      width: 640px;
      .carousel-item-cont {
        background: pink;
        height: 100%;
      }
    }
  }
  .login-right {
    // background: #266bf0;
    flex: 1;
    height: 100%;
    // position: relative;
    .copy-support {
      font-size: 13px;
      font-family: MicrosoftYaHei;
      color: #c1c1c1;
      line-height: 17px;
      text-align: center;
      margin-left: -100px;
    }
    .login-form {
      display: flex;
      justify-content: center;
      // margin-left: 53px;
      height: 100%;
      // margin-top: 140px;
      // background-image: url('~@/assets/images/login_form_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .form-view {
        // padding: 100px 79px 0 89px;
        width: 100%;
      }
    }
    .tab-box {
      height: 61px;
      line-height: 61px;
      cursor: pointer;
      display: flex;
      justify-content: space-around;
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      // margin-bottom: 40px;
      font-size: 18px;
      color: #333;
      li {
        line-height: 24px;
        padding-bottom: 15px;
        // height: 40px;
        border-bottom: 4px solid transparent;
      }
    }

    .active {
      // height: 4px;
      border-radius: 2px;
      border-bottom: 4px solid #266bf0 !important;
      color: #266bf0;
      font-weight: 700;
      // padding-top: 5px;
    }
  }
  .login-register-right {
    width: 46%;
    height: 100%;
  }
}
</style>
