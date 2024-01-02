<template>
    <div style="overflow: auto; height: 1000px;">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="momentId" label="动态ID"></el-table-column>
            <el-table-column prop="createdAt" label="举报时间"></el-table-column>
            <el-table-column prop="reportCount" label="被举报次数"></el-table-column>
            <el-table-column prop="reportReasons" label="举报理由"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="{ row }">
                <el-button type="danger" @click="handleDelete(row.momentId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { ElTable, ElTableColumn, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElPopconfirm, ElMessage } from 'element-plus';
  import axios from 'axios';
  
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
    data() {
      return {
        type: 'disease',
      }
    },
    setup() {
      const tableData = ref([]);
      const auth = ref(JSON.parse(sessionStorage.getItem('authToken')));
      const token = auth.value.token;
      const form = ref({
        momentId: '',
        createdAt: '',
        reportCount: '',
        reortReasons: '',
      });
      //获取举报信息列表
      axios.get('/api/admin/moment/report', 
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        tableData.value = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  
      const handleDelete = (momentId) => {
        if(window.confirm("确定要删除该举报信息对应的动态吗？")){
          axios.get(`/api/admin/moment/delete?momentId=${momentId}`,
          { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            console.log(response.data);
            ElMessage.success("删除成功！");
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
        }
      };
  
      return {
        tableData,
        form,
        handleDelete,
      };
    },
  };
  </script>
  