<template>
    <el-form :model="form" label-width="80px" style="margin-top: 20px;">
      <el-form-item label="ID" >
        <el-input v-model="form.id" style="width: 180px" size="mini"></el-input>
        <text>&emsp;</text>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <text>&emsp;</text>
        <el-button type="primary" @click="handleRefresh">返回</el-button>
      </el-form-item>
    </el-form>
    <div style="overflow: auto; height: 700px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="昵称"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="身份"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { ElTable, ElTableColumn, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElPopconfirm, ElMessageBox } from 'element-plus';
  
  export default {
    components: {
      ElTable,
      ElTableColumn,
      ElButton,
      ElDialog,
      ElForm,
      ElFormItem,
      ElInput,
      ElPopconfirm,
    },
    setup() {
      const tableData = ref([]);
      const auth = ref(JSON.parse(sessionStorage.getItem('authToken')));
      const token = auth.value.token;
      console.log(token);
      const url = ref('/api/admin/account/all');
      const form = ref({
        id: '',
        username: '',
        email: '',
        role: '',
      });
      //从后端获取列表数据
      axios.get(url.value, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        //tableData.value = response.data;
        tableData.value = response.data.data;
        console.log(response.data.data[0].id);
      })
      .catch((error) => {
        console.error(error);
      });

      const handleSearch = () => {
        if (!form.value.id) {
          alert('请输入ID');
          return;
        }
        const result = tableData.value.find((item) => item.id === Number(form.value.id));
        if (result) {
          tableData.value = [result];
        } else {
          tableData.value = [];
        }
      };
  
      const handleRefresh = () => {
        window.location.reload();
      };

      return {
        tableData,
        form,
        handleSearch,
        handleRefresh,
      };
    },
    methods: {
      showConfirm(row) {
        ElMessageBox.confirm('您确定要删除吗？', '提示', {
          center: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 用户点击了确定按钮的回调逻辑
          this.handleDelete(row);
        }).catch(() => {
          // 用户点击了取消按钮的回调逻辑
        });
      }
    }
  };
  </script>

<style>
.el-message-box__wrapper {
  color: red;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
  </style>
  