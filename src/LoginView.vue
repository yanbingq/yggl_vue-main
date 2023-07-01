<template>
    <div class="bg">
        <el-main>
            <el-form :model="loginForm" ref="loginForm" label-width="0" class="login-form">
                <h3>用户登录</h3>
                <el-form-item>
                    <el-input type="text" v-model="loginForm.username" placeholder="username"> </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="loginForm.password" placeholder="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" class="submitBtn" round v-on:click="login">登录</el-button>
                    <el-button type="primary" class="resetBtn" round v-on:click="resetForm">重置</el-button>
                </el-form-item>
                <el-form-item>

                </el-form-item>
            </el-form>
        </el-main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login: function () {
            this.$axios
                .post('login', { username: this.loginForm.username, password: this.loginForm.password })
                .then(res => {
                    if (res.data.code == 200) {
                        let token = res.data.data;
                        localStorage.setItem("token", token);
                        this.$router.push({ 'path': '/', query: this.loginForm });
                    }
                    else {
                        this.$message.error('账号或密码错误');
                    }
                })
                .catch(error => {
                    alert(error)
                })
        },
        resetForm() {
            this.$refs.loginForm.resetFields();
            this.loginForm.username = '';
            this.loginForm.password = '';
        }
    }
}


</script>
<style scoped>
.bg {
    background-image: url("./assets/1.jpg");
    background-size: cover;
    width: 100%;
    height: 900px;
}

.login-form {

    margin: 20px auto;
    width: 310px;
    background: #fff;
    box-shadow: 0 0 35px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
    margin-top: 200px;
}

.submitBtn {
    width: 40%;
}
</style>