<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import router from "@/router";
import {reactive, ref} from "vue";
import { login } from "@/net/auth";

const formRef = ref()
const form = reactive({
  username: '',
  password: '',
  remember: false
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码'}
  ]
}

function userLogin() {
  formRef.value.validate((isValid) =>{
    if (isValid) {
      login(form.username, form.password, form.remember, () => 
      router.push({name: "Index"}));
    }
  });
}
</script>

<template>
  <div class="login-page">
    <div>
      <div style="font-size: 20px">账号登录</div>
      <div style="font-size: 12px;color: grey; margin-top: 5px">请输入用户名和密码以进入系统</div>
    </div>
    <div style="margin-top: 30px">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" maxlength="10" type="text" placeholder="用户名">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" maxlength="20" placeholder="密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="remember">
          <el-checkbox v-model="form.remember" label="记住我"/>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button @click="userLogin" style="width: 200px; margin-top: 30px" type="success" plain>立即登录</el-button>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}
</style>