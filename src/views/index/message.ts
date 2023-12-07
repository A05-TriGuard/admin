import { ElMessage, ElMessageBox } from "element-plus";
 
function confirmDelete(ok:Function){
    ElMessageBox.confirm(
        '将要删除本条记录，是否继续?',
        '警告',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        ok();
        ElMessage({
            type: 'success',
            message: '删除成功！',
        });
    }).catch((err) => {
        ElMessage({
            type: 'info',
            message: '取消操作'+err,
        });
    })
}
 
export {confirmDelete}
 