<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://avatars.githubusercontent.com/u/38459200?v=4" class="user-avatar" />
          <span class="user-name">{{ userInfo.extInfo.orgName }}</span>
          <SvgIcon icon-class="down" class="icon-down" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SvgIcon from '@/components/SvgIcon'

export default {
  components: { SvgIcon },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 2px 0px 4px 0px rgba(227, 230, 232, 0.1);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 24px;
          height: 24px;
          border-radius: 10px;
        }

        .user-name {
          display: inline-block;
          color: #212529;
          font-size: 14px;
          margin: 0 8px;
        }
        .icon-down {
          width: 12px;
          height: 12px;
          margin-left: 8px;
        }
      }
    }
  }
}
::v-deep .el-dropdown-menu__item--divided {
  border: none;
  margin: -5px 0;
}
</style>
