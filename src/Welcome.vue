<template>
  <div class="pic">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="5" style="font-size: 40px; margin-right: 1300px">
            <img src="./assets/2.jpg" width="60px" height="100%" />员工信息管理系统
          </el-menu-item>
          <el-menu-item index="1" style="margin-left: 1000px"><router-link to="/login">{{ username
          }}</router-link></el-menu-item>
          <el-menu-item index="3" @click="userInfo">个人信息</el-menu-item>
          <el-menu-item index="3" @click="Backstage">后台管理</el-menu-item>
        </el-menu></el-header>
      <el-main><router-view /></el-main>
    </el-container>

    <el-dialog title="个人信息" :visible.sync="dialogFormVisible0">
      <el-card class="box-card">
        <el-descriptions class="margin-top" :column="2" :size="size" border style="margin-top: 10px">
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              编号
            </template>
            {{ userid }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            {{ username }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              性别
            </template>
            {{ gender }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            {{ usertel }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              居住地
            </template>
            {{ addres }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              备注
            </template>
            <el-tag size="small">{{ rolename }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              真实姓名
            </template>
            {{ realname }}
          </el-descriptions-item>
        </el-descriptions>

        <el-button @click="opeanmodel" style="margin-top: 15px">修改个人资料
        </el-button>

        <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.loginname" autocomplete="off" :label="this.username"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="form.usertel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="居住地" :label-width="formLabelWidth">
              <el-input v-model="form.addres" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="form.realname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-input v-model="form.gender" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </div>
        </el-dialog>


        <el-button @click="opeanpwd" style="margin-top: 15px">修改个人密码</el-button>
        <el-dialog title="用户密码修改" :visible.sync="dialogFormVisible3">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="输入新密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("原密码不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value == this.ruleForm.age) {
        callback(new Error("新密码不能与原密码相同!"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible0: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: "120px",
      user: {
        loginName: "",
      },
      username: "点击登录",
      usertel: "",
      userid: 0,
      addres: "",
      gender: "",
      realname: "",
      rolename: "",
      form: {
        loginname: this.username,
        usertel: this.usertel,
        realname: this.realname,
        addres: this.addres,
        gender: this.gender,
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  created: function () {

    this.$axios
      .post(
        "userInfo",
        { username: this.$route.query.username, password: this.$route.query.password }
      )
      .then((res) => {
        if (res.data.code == 200) {
          this.username = res.data.data.loginname;
          this.usertel = res.data.data.usertel;
          this.userid = res.data.data.userid;
          this.addres = res.data.data.addres;
          this.gender = res.data.data.gender;
          this.realname = res.data.data.realname;
          this.rolename = res.data.data.rolename;
        }
      })
      .error((error) => {
        console.log(error);
      });
  },
  methods: {
    Backstage: function () {
      if (localStorage.getItem('token') == null) {
        this.$router.push({ path: "/login" });
      }
      this.$axios
        .post(
          "userRole",
          { username: this.$route.query.username }
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({ path: "/main", query: this.user });
          } else {
            this.$message({
              message: "你没有权限",
              type: "warning",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },
    userInfo: function () {
      this.user.loginName = this.$route.query.username;
      if (this.username != "点击登录") {
        this.dialogFormVisible0 = true;
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.$axios
        .post("savepwd", {
          pwd: this.ruleForm.age,
          password: this.ruleForm.pass,
          loginname: this.username,
        })
        .then((res) => {
          if (res.data.code == -200) {
            alert(res.data.msg);
          }
          this.dialogFormVisible3 = false;
        })
        .catch((error) => { });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    opeanmodel: function () {
      this.form.loginname = this.username;
      this.form.usertel = this.usertel;
      this.form.realname = this.realname;
      this.form.addres = this.addres;
      this.form.gender = this.gender;
      this.dialogFormVisible = true;
    },
    opeanpwd: function () {
      this.dialogFormVisible3 = true;
    },
    update: function () {
      this.$axios
        .post("/updateUser", {
          userid: this.userid,
          loginname: this.form.loginname,
          addres: this.form.addres,
          gender: this.form.gender,
          realname: this.form.realname,
          usertel: this.form.usertel,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.dialogFormVisible = false;
            this.username = res.data.data.loginname;
            this.usertel = res.data.data.usertel;
            this.userid = res.data.data.userid;
            this.addres = res.data.data.addres;
            this.gender = res.data.data.gender;
            this.realname = res.data.data.realname;
            this.rolename = res.data.data.rolename;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped></style>
