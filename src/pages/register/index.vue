<template>
  <div id="app">
    <el-form label-width="80px" :model="con">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名" size="small">
                <el-input v-model="con.name" @input="changeData" placeholder="请输入姓名搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机" size="small" @change="changeData">
                <el-input v-model="con.phone" @input="changeData" placeholder="请输入手机号码搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="岗位" size="small">
                <el-select v-model="con.job" @change="changeData">
                  <el-option :label="item.name" :value="item.id"  v-for="item in jobs" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="入职日期" size="small" prop="dateRange">
              <el-date-picker
             v-model="con.dateRange"
             @change="changeData"
             type="daterange"
             :picker-options="pickerOptions"
             range-separator="至"
             value-format="yyyy-MM-dd"
             start-placeholder="开始日期"
             end-placeholder="结束日期">
           </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
    <el-table
      :data="tableData"
       v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="job.name"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="time"
        label="填表日期">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-size="con.number"
       layout="total, prev, pager, next"
       :total="total">
     </el-pagination>
   </div>
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data(){
    return {
      tableData: [
        {
          name:'来成',
          job:"销售",
          phone: '13409918339',
          date: '2013'
        }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      con: {
        name: '',
        phone: '',
        job: '',
        number: 5,
        start: 0,
        dateRange: ''
      },
      currentPage: 1,
      loading: true,
      total: 20,
      jobs: []
    }
  },
  methods: {
    init(){
      this.getData();
      this.getJobs();
    },
    //监听页码
    handleCurrentChange(val) {
      this.con.start = (val - 1) * this.con.number;
      this.getData();
    },
    getData(){
      axios.get('/api/register', {
        params: this.con
      })
      .then(res=>{
        this.tableData = res.data.result;
        this.total = res.data.total;
      })
    },
    getJobs(){
      axios.get('/api/job')
      .then(res=>{
        this.jobs = res.data;
        this.loading = false;
      })
    },
    changeData(){
      this.getData();
    }
  },
  mounted(){
    this.init();
  }
}
</script>
<style scoped>
#app{
  padding:20px;
  box-sizing: border-box;
}
.pagination{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
