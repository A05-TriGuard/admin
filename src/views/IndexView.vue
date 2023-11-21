<script setup>
import { HomeFilled, List } from "@element-plus/icons-vue";
</script>

<template>
<div class="index-view">
  <div class="navigator">
    <el-menu default-active="1" mode="vertical" class="navigator-menu" :router="true">
      <div style="text-align: center; margin: 10px 0 30px 0">
        <div>TriGuard-三高助手</div>
      </div>
      <el-divider class="el-divider" />
      <el-menu-item index="1" route="/">
        <el-icon><HomeFilled /></el-icon>
        首页
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
}

.el-divider {
  margin: 0;
}

.right-card {
  flex: 1;
}
</style>