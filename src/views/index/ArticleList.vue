<template>
  <el-form :model="form" label-width="80px" style="margin-top: 20px;">
  </el-form>
  <el-select v-model="type" placeholder="请选择文章类型">
    <el-option label="Disease" value="disease"></el-option>
    <el-option label="Science" value="science"></el-option>
  </el-select>
  <div style="overflow: auto; height: 800px;">
    <el-table v-if="type === 'disease'" :data="tableDataDisease" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="subtitle" label="副标题"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table v-if="type === 'science'" :data="tableDataScience" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="subtitle" label="副标题"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
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
    const tableDataScience = ref([]);
    const tableDataDisease = ref([]);
    const id = ref('');
    const title = ref('');
    const subtitle = ref('');
    const auth = ref(JSON.parse(sessionStorage.getItem('authToken')));
    const token = auth.value.token;
    const form = ref({
      id: '',
      title: '',
      subtitle:'',
    });
    //获取两种科普文章列表
    axios.get('/api/article/disease/list?page=1&size=99999', 
    { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      tableDataDisease.value = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

    axios.get('/api/article/science/list?page=1&size=99999', 
    { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      tableDataScience.value = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

    const handleDelete = (articleId) => {
      if(window.confirm("确定要删除该文章吗？")){
        axios.get(`/api/admin/article/delete?articleId=${articleId}`,
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

    const handleRefresh = () => {
      window.location.reload();
    };

    return {
      tableDataScience,
      tableDataDisease,
      form,
      handleDelete,
      handleRefresh,
    };
  },
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
