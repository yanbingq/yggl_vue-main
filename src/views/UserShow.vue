<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userid" label="员工编号" width="100">
      </el-table-column>
      <el-table-column prop="loginname" label="用户名" width="100">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="100">
      </el-table-column>
      <el-table-column prop="usertel" label="联系电话"> </el-table-column>
      <el-table-column prop="addres" label="详细地址" width="180">
      </el-table-column>
      <el-table-column prop="realname" label="真名"> </el-table-column>
      <el-table-column prop="rolename" label="员工角色"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">授权</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>确认移除该员工吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="请选择所给权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <template>
          <el-radio-group v-model="form.roleId">
            <el-radio :label="2">管理员</el-radio>
            <el-radio :label="3">员工</el-radio>
          </el-radio-group>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "120px",
      tableData: [
        {
          userid: 0,
          loginname: "",
          usertel: "",
          addres: "",
          gender: "",
          realname: "",
          rolename: "",
        },
      ],
      form: {
        roleId: 2,
      },
    };
  },
  created: function () {
    this.$axios
      .get("findAll")
      .then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleDel(index, row) {
      this.tableData.userid = row.userid;
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.tableData.userid = row.userid;
      this.dialogFormVisible = true;
    },
    deleteUser: function () {
      this.$axios
        .post("delUser", { userid: this.tableData.userid })
        .then((res) => {
          if (res.data.code == 200) {
            window.location.reload();
            this.dialogVisible = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update: function () {
      this.$axios
        .post("upUserRole", {
          roleId: this.form.roleId,
          userId: this.tableData.userid,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.dialogFormVisible = false;
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
