<template>
  <div>
    <el-row :gutter='20'>
      <el-col :span='7'>
        <div id="myChart1" :style="{ width: '500px', height: '500px' }"></div>
      </el-col>
      <el-col :span='8'>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:25px">通知</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">更换公告</el-button>
          </div>
          <div class="text item">
            {{ this.notice.noAction }}
          </div>
          <div class="rq">
            {{ this.notice.noTime }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="更换公告" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新公告" :label-width="formLabelWidth">
          <el-input v-model="form.noAction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNotice">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
var that = this;
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      msg: 'Welcome to Your Vue.js App',
      datax: [3564, 3287, 3546, 3478, 3251, 3526, 4123],
      notice: {
        id: 1,
        noAction: '这是一个公告！',
        noTime: '2022-3-18 '
      },
      form: {
        noAction: '',
      }
    }
  },

  created: function () {
    this.$axios
      .get('findNotice')
      .then(res => {
        if (res.data.code == 200) {
          this.notice = res.data.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    addNotice: function () {
      this.$axios
        .post('addNotice', {
          id: 1, noAction: this.form.noAction
        })
        .then(res => {
          if (res.data.code == 200) {
            this.notice = res.data.data;
            this.dialogFormVisible = false;
          }
        })
        .catch(error => {
          console.log(error);
        })
    },

  }
}
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  height: 500px;
  /* background-color: aqua; */
}

.rq {
  margin-left: 200px
}
</style>
