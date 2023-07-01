<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="操作人">
        <el-input v-model="formInline.realname" placeholder="操作人"></el-input>
      </el-form-item>

      <el-form-item label="操作时间">
        <div class="block">
          <el-date-picker v-model="formInline.date1" align="right" type="date" placeholder="选择日期"
            :picker-options="pickerOptions" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="-">
        <div class="block">
          <el-date-picker v-model="formInline.date2" align="right" type="date" placeholder="选择日期"
            :picker-options="pickerOptions" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>


    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="logId" label="日志编号" width="180">
      </el-table-column>
      <el-table-column prop="realname" label="操作人" width="180">
      </el-table-column>
      <el-table-column prop="logName" label="操作详情">
      </el-table-column>
      <el-table-column prop="logTime" label="操作时间">
      </el-table-column>
      <el-table-column prop="userIp" label="IP">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        logId: '',
        realname: '',
        logName: '',
        logTime: '',
        userIp: '',
      }],
      formInline: {
        realname: '',
        date1: '',
        date2: '',
      }
    }
  },
  created: function () {
    this.$axios
      .get('logAll')
      .then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        }
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    onSubmit: function () {

      this.$axios
        .post('logByInfo', {
          realname: this.formInline.realname,
          date1: this.formInline.date1,
          date2: this.formInline.date2
        })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>
