<script setup>
import { HomeFilled, List, Avatar, DocumentAdd, UserFilled } from "@element-plus/icons-vue";
</script>

<template>
<div class="index-view">
  <div class="navigator">
    <el-menu default-active=activeIndex class="navigator-menu" :router="true">
      <div style="text-align: center; margin: 10px 0 30px 0">
        <div>TriGuard-三高助手</div>
      </div>
      <el-divider class="el-divider" />
      <el-menu-item index="/AdministratorList" route="/AdministratorList">
        <el-icon><Avatar /></el-icon>
        管理员列表
      </el-menu-item>
      <el-menu-item index="/UserList" route="/UserList">
        <el-icon><UserFilled /></el-icon>
        用户列表
      </el-menu-item>
      <el-menu-item index="/Edit" route="/Edit">
        <el-icon><DocumentAdd /></el-icon>
        发布文章
      </el-menu-item>
      <el-menu-item index="/ArticleList" route="/ArticleList">
        <el-icon><DocumentAdd /></el-icon>
        文章列表
      </el-menu-item>
      <el-divider class="el-divider" />
    </el-menu>
  </div>
  <div class="right-card">
    <router-view />
  </div>
</div>
</template>

<style scoped>
.index-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.navigator {
  width: 150px;
  height: 100vh;
  z-index: 1;
}

.navigator-menu {
  height: 100vh;
  padding-top: 20px;
}

.navigator-menu .el-menu-item {
  height: 40px;
  caret-color: rgba(0, 0, 0, 0);
}

.el-divider {
  margin: 0;
}

.right-card {
  flex: 1;
}
</style>

<script>
export default {
  data() {
    return {
      activeIndex: this.$router.path,
    };
  },
  created() {
    this.activeIndex = this.$router.path;
    if (sessionStorage.getItem("ifRefresh") == 0){
      window.location.reload();
      sessionStorage.setItem("ifRefresh", 1);
    }
  },
};
</script>