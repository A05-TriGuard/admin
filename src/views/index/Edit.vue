<template>
  <div>
    <br>
    <text>&emsp;&ensp;</text>标题：<el-input v-model="title" class="titleInput" placeholder="请输入标题"></el-input>
    <br><br class="inputBlank">
    <text>&ensp;</text>副标题：<el-input v-model="subtitle" class="titleInput" placeholder="请输入副标题"></el-input>
    <el-select v-model="type" placeholder="请选择文章类型">
      <el-option label="Disease" value="disease"></el-option>
      <el-option label="Science" value="science"></el-option>
    </el-select>
    <br><br><text>&ensp;内容：</text>
    <el-input type="textarea" v-model="content" placeholder="请输入内容" :rows="27"></el-input>
    <el-button type="primary" @click="publish">发布</el-button>
    <el-button type="default" @click="saveDraft">保存草稿</el-button>
  </div>
</template>
  
<script>
import { ref, watch } from 'vue';
import axios from 'axios';
import { ElInput, ElButton, ElMessage, ElSelect, ElOption } from 'element-plus';
import router from "@/router";
import {useMagicKeys} from '@vueuse/core'

export default {
  components: {
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
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
      type.value = response.data.data.type;
      if(title.value != '' || subtitle.value != '' || content.value != '')
        ElMessage.success("已加载上次保存的草稿");
    })
    .catch((error) => {
      console.error(error);
    });
    
    //ElMessage.success(auth.value.token)
    
    const publish = () => {
      // 发布文章
      axios.post(url_create.value,{
        type: type.value,
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
        //发布成功后清空草稿
        axios.post(url_draft.value,{type: '',title: '',subtitle: '',content: ''},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization : `Bearer ${token}` 
          }
        }).then(res => {window.location.reload();window.alert("发布成功！")}).catch(err => {console.log(err);});
      })
      .catch(err => {
        console.log(err);
        ElMessage.err("发布失败！")
      });
      
      
    };

    const saveDraft = () => {
      // 发送请求
      axios.post(url_draft.value,{
        type: type.value,
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
    const keys = useMagicKeys({
          passive: false,
          onEventFired(e) {
            if (e.ctrlKey && e.key === 's') {
              e.preventDefault();
              return false;
        }
          }
      })

      const ctrls = keys['ctrl+s']

      watch(ctrls, (v) => {
          if (v) {
            saveDraft();
          }
      })
    return {
      token,
      title,
      subtitle,
      content,
      type,
      keys,
      ctrls,
      watch,
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