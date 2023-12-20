<template>
  <el-form :model="form" label-width="80px" style="margin-top: 20px;">
    <el-form-item>
      <el-button type="primary" @click="$router.push('/Edit')">新建草稿</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="subtitle" label="副标题"></el-table-column>
    <el-table-column prop="click" label="浏览量"></el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        <el-button type="primary" @click="$router.push('/Edit')">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { ref } from 'vue';
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
    const tableData = ref([
      {
        id: 1,
        title: '标题1',
        subtitle: '副标题1',
        click: 666,
      },
      {
        id: 2,
        title: '标题2',
        subtitle: '副标题2',
        click: 667,
      },
      {
        id: 3,
        title: '标题3',
        subtitle: '副标题3',
        click: 668,
      },
    ]);

    const form = ref({
      id: '',
      title: '',
      subtitle:'',
      click: '',
    });

    const handleDelete = (row) => {
      if(window.confirm("确定要删除该草稿吗？")){
        const index = tableData.value.indexOf(row);
        tableData.value.splice(index, 1);
      }
    };

    const handleAdd = () => {
      
    };

    const handleEdit = () => {
      
    };

    const handleRefresh = () => {
      window.location.reload();
    };

    return {
      tableData,
      form,
      handleDelete,
      handleAdd,
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
