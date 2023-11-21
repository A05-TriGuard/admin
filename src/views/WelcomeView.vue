<script setup>

</script>

<template>
<div class="welcome-view">
  <div style="flex: 1">
    <el-image style="width: 100%; height: 100%" fit="cover"
              src="https://pic.netbian.com/uploads/allimg/230907/185929-169408436996eb.jpg"/>
  </div>
  <div class="title">
    <div style="font-size: 30px; font-weight: bold">秒测网速管理后台</div>
    <div style="font-size: 10px; margin-top: 10px">清华大学软件学院移动云计算与未来网络实验室</div>
  </div>
  <div class="right-card" style="width: 400px; z-index: 1">
    <router-view></router-view>
  </div>
</div>
</template>

<style scoped>
.welcome-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.title {
  position: absolute;
  bottom: 50px;
  left: 50px;
  color: white;
  text-shadow: 0 0 10px black;
}
</style>