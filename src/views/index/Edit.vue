<template>
    <div>
        <br>
        <text>&emsp;&ensp;</text>标题：<el-input v-model="title" class="titleInput" placeholder="请输入标题"></el-input>
        <br><br class="inputBlank">
        <text>&ensp;</text>副标题：<el-input v-model="subtitle" class="titleInput" placeholder="请输入副标题"></el-input>
        <br><br><text>&ensp;内容：</text>
        <el-input type="textarea" v-model="content" placeholder="请输入内容" :rows="25"></el-input>
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button type="default" @click="saveDraft">保存草稿</el-button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { ElInput, ElButton, ElMessage } from 'element-plus';
  import { f, defaultError, get, post, internalGet, internalPost } from "@/net/index";
  import router from "@/router";
  
  export default {
    components: {
      ElInput,
      ElButton,
    },
    setup() {
      const title = ref('');
      const subtitle = ref('');
      const content = ref('');
      const type = ref('');
      const url_draft = ref('/api/admin/article/draft');
      const url_create = ref('/api/admin/article/create');
      const auth = ref(JSON.parse(sessionStorage.getItem('authToken')));
      const token = auth.value.token;

      axios.get(url_draft.value, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data.data);
        title.value = response.data.data.title;
        subtitle.value = response.data.data.subtitle;
        content.value = response.data.data.content;
        type.value = response.data.data.value;
        if(title.value != '' || subtitle.value != '' || content.value != '')
          ElMessage.success("已加载上次保存的草稿");
      })
      .catch((error) => {
        console.error(error);
      });
      
      //ElMessage.success(auth.value.token)
      
      const publish = () => {
        // 发布文章的逻辑
        const data = JSON.stringify({
          type: '9',
          title: title.value,
          subtitle: subtitle.value,
          content: content.value
        });
        // 发送请求
        axios.post(url_create.value,{
          type: '',
          title: title.value,
          subtitle: subtitle.value,
          content: content.value
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization : `Bearer ${token}` 
          }
        })
        .then(res => {
          ElMessage.success("发布成功！")
          //发布成功后清空草稿
          axios.post(url_draft.value,{type: '',title: '',subtitle: '',content: ''},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization : `Bearer ${token}` 
            }
          }).then(res => {}).catch(err => {console.log(err);});
        })
        .catch(err => {
          console.log(err);
          ElMessage.err("发布失败！")
        });
      };
  
      const saveDraft = () => {
        // 发送请求
        axios.post(url_draft.value,{
          type: '',
          title: title.value,
          subtitle: subtitle.value,
          content: content.value
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization : `Bearer ${token}` 
          }
        })
        .then(res => {
          ElMessage.success("保存成功！")
        })
        .catch(err => {
          console.log(err);
          ElMessage.err("保存失败！")
        });

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