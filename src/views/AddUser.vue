<template>
  <div class="bg">
    <el-form class="tp">
      <el-row :gutter=20></el-row>
    </el-form>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名" prop="loginname">
            <el-input v-model="ruleForm.loginname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系电话" prop="usertel">
            <el-input v-model.number="ruleForm.usertel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="家庭住址" prop="useraddr">
            <el-input v-model="ruleForm.useraddr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="真名" prop="realname">
            <el-input v-model="ruleForm.realname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="角色" prop="roleId">
            <div>
              <el-radio v-model="ruleForm.roleId" label="2" border>管理员</el-radio>
              <el-radio v-model="ruleForm.roleId" label="3" border>员工</el-radio>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="性别" prop="gender">
            <div>
              <el-radio v-model="ruleForm.gender" label="男" border>男</el-radio>
              <el-radio v-model="ruleForm.gender" label="女" border>女</el-radio>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item style="display: flex; justify-content: flex-start;margin-left: 10%;">
        <el-button type="primary" @click="submitForm('ruleForm')">录入</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
    <el-form class="tp">
      <el-row :gutter=20></el-row>
    </el-form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        loginname: '',
        usertel: '',
        useraddr: '',
        realname: '',
        gender: '',
        roleId: ''
      },
      rules: {
        loginname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        usertel: [
          { type: 'number', required: true, message: '请输入联系电话，且必须是数字', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        useraddr: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('addUser', {
              usertel: this.ruleForm.usertel,
              addres: this.ruleForm.useraddr,
              gender: this.ruleForm.gender,
              realname: this.ruleForm.realname,
              loginname: this.ruleForm.loginname
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$axios
                  .post('addRole', { userId: res.data.data.userid, roleId: this.ruleForm.roleId })
                  .then(res => {
                    if (res.data.code == 200) {
                      this.$refs[formName].resetFields();
                    }
                  }).catch(error => { console.log(error) })
              }
            }).catch(error => { console.log(error) })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
.demo-ruleForm {
  margin-top: 50px;
}

.tp {
  margin-right: 800px;
}

.bg {
  background-color: antiquewhite;
}
</style>
