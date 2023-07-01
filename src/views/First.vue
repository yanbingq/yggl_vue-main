<template>
  <div>
    <el-row :gutter="20">
      <el-col :span='12'>
        <div id="myChart1" :style="{ width: '500px', height: '500px' }"></div>
      </el-col>

      <el-col :span='8'>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:25px">通知</span>
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
  </div>
</template>
<script>
var that = this;
export default {
  data() {
    return {
      notice: {
        noAction: '这是一个公告！',
        noTime: '2022-3-18 '
      },
      msg: 'Welcome to Your Vue.js App',
      datax: [3564, 3287, 3546, 3478, 3251, 3526, 4123],

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
      })
  },
}
</script>
<style scoped>
.sy {
  width: 1200px;

  background-color: rgb(232, 241, 239);
  border: 1px;
  margin-left: 220px;
}

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

#myChart1 {
  margin-left: 15px
}
</style>
