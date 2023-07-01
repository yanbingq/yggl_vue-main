<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title"><router-link to="/main/">首页</router-link></span>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>员工管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1"><router-link to="/userShow">员工列表</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/addUser">新员工信息录入</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>操作日志</template>
          <el-menu-item-group>
            <el-menu-item index="3-1"><router-link to="/logView">日志详情</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 20px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/login">重新登录</router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>员工信息管理系统</span>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      userInfos: {
        username: "点击登录",
        password: "1",
      },
    };
  },
  created: function () {
    this.userInfos.username = this.$route.query.loginName;
  },
  methods: {
    userInfo: function () {
      this.$router.push({ path: "userInfo", query: this.userInfos });
    },
    fanhui: function () {
      this.$router.push({ "/path": "/" });
    },
  },
};
</script>
<style scoped>
.el-header {
  background-color: rgb(79, 163, 241);
  color: rgb(0, 0, 0);
  line-height: 60px;
}
</style>
