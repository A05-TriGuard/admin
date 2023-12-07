<template>
    <el-form :model="form" label-width="80px" style="margin-top: 20px;">
      <el-form-item label="ID" >
        <el-input v-model="form.id" style="width: 180px" size="mini"></el-input>
        <text>&emsp;</text>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.name" style="width: 180px" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" style="width: 180px" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="form.phone" style="width: 180px" size="mini"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <text>&emsp;</text>
        <el-button type="primary" @click="handleRefresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { ElTable, ElTableColumn, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElPopconfirm } from 'element-plus';
  
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
      const tableData = ref([
        {
          id: 1,
          name: '张三',
          phone: '12345678901',
          state: '在线',
        },
        {
          id: 2,
          name: '李四',
          phone: '12345678902',
          state: '离线',
        },
        {
          id: 3,
          name: '王五',
          phone: '12345678903',
          state: '在线',
        },
      ]);
  
      const form = ref({
        id: '',
        name: '',
        phone: '',
      });
  
      const handleDelete = (row) => {
        const index = tableData.value.indexOf(row);
        tableData.value.splice(index, 1);
      };
  
      const handleAdd = () => {
        if (!form.value.id || !form.value.name || !form.value.phone) {
          alert('请输入完整的用户信息');
          return;
        }
        const newRow = {
          id: form.value.id,
          name: form.value.name,
          phone: form.value.phone,
        };
        tableData.value.push(newRow);
        form.value.id = '';
        form.value.name = '';
        form.value.phone = '';
      };

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
        handleDelete,
        handleAdd,
        handleSearch,
        handleRefresh,
      };
    },
  };
  </script>
  