<template>
  <el-form :model="form" label-width="80px" style="margin-top: 20px;">
    </el-form>
    <div style="overflow: auto; height: 1000px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="昵称"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
      </el-table>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { ElTable, ElTableColumn, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElPopconfirm, ElMessage } from 'element-plus';
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
      items: [],
    }
  },
  props: {
    authToken: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const auth = ref(JSON.parse(sessionStorage.getItem('authToken')));
    const token = auth.value.token;
    const url = ref('/api/admin/account/list');
    const form = ref({
      id: '',
      username: '',
      email: '',
    });
    const tableData = ref([]);
    axios.get(url.value, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      //tableData.value = response.data;
      tableData.value = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
    return {
      token,
      url,
      form,
      tableData,
    };
  }
}
</script>
