<template>
    <div>
        <br>
        <el-input v-model="title" class="titleInput" placeholder="请输入标题"></el-input>
        <br><br class="inputBlank">
        <el-input v-model="subtitle" class="titleInput" placeholder="请输入副标题"></el-input>
        <br><br>
        <el-input type="textarea" v-model="content" placeholder="请输入内容" :rows="25"></el-input>
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button type="default" @click="saveDraft">保存草稿</el-button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { ElInput, ElButton } from 'element-plus';
  
  export default {
    components: {
      ElInput,
      ElButton,
    },
    setup() {
      const auth = ref(JSON.parse(sessionStorage.getItem('authToken')));
      const token = auth.value.token;
      const title = ref('');
      const subtitle = ref('');
      const content = ref('');
      //ElMessage.success(auth.value.token)
  
      const publish = () => {
        // 发布文章的逻辑
      };
  
      const saveDraft = () => {
        // 保存草稿的逻辑
      };
  
      return {
        token,
        title,
        subtitle,
        content,
        publish,
        saveDraft,
      };
    },
  };
  </script>
  
<style>
.titleInput {
    height: 35px;
    width: 800px;
}
</style>