<template>
  <div id="app">
    <el-form ref="condition" class="condition" :model="condition" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名" size="small" prop="name">
            <el-input v-model.lazy="condition.name" placeholder="支持模糊搜索（输入即搜）" @input="searchByName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="岗位" size="small" prop="job">
              <el-select v-model="condition.job" placeholder="请选择岗位">
                <el-option v-for="item in jobs" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门" size="small" prop="department">
              <el-select v-model="condition.department" placeholder="请选择岗位">
                <el-option v-for="item in departments" :label="item.title" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="手机号码" prop="phone" size="small">
            <el-input v-model="condition.phone" placeholder="手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="区域" size="small" prop="city">
              <el-select v-model="condition.city" placeholder="请选择区域">
                <el-option v-for="item in citys" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" size="small" prop="sex">
              <el-select v-model="condition.sex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="入职日期" size="small" prop="dateRange">
            <el-date-picker
           v-model="condition.dateRange"
           type="daterange"
           :picker-options="pickerOptions"
           range-separator="至"
           value-format="yyyy-MM-dd"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
         </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-switch
              v-model="condition.is_on"
              active-value=""
              @change="handleIsOn"
              inactive-value="1"
              active-text="全部显示"
              inactive-text="只显示在职">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-button type="primary" icon="el-icon-search" @click="searchByButton" :loading="btnLoading">查询</el-button>
      <el-button icon="el-icon-delete" @click="resetForm">清除筛选条件</el-button>
    </el-form>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="转正时间">
              <span>{{ scope.row.name }}</span>
            </el-form-item>
            <el-form-item label="民族">
              <span v-if="scope.row.nation == 1">汉族</span>
              <span v-else>其它</span>
            </el-form-item>
            <el-form-item label="毕业院校">
              <span>{{ scope.row.school }}</span>
            </el-form-item>
            <el-form-item label="银行">
              <span>{{ scope.row.bank.name }}</span>
            </el-form-item>
            <el-form-item label="银行卡号">
              <span>{{ scope.row.bank_card }}</span>
            </el-form-item>
            <el-form-item label="婚姻状况">
              <span v-if="scope.row.bank.marriage">已婚</span>
              <span v-else>未婚</span>
            </el-form-item>
            <el-form-item label="劳动开始时间">
              <span>{{ scope.row.start }}</span>
            </el-form-item>
            <el-form-item label="劳动截止时间">
              <span>{{ scope.row.end }}</span>
            </el-form-item>
            <el-form-item label="劳动期限">
              <span>{{ scope.row.deadline }}年</span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{ scope.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="学历">
              <span>{{ scope.row.edu.name }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ scope.row.card }}</span>
            </el-form-item>
            <el-form-item label="紧急联系人">
              <span>{{ scope.row.emergency }}</span>
            </el-form-item>
            <el-form-item label="紧急联系人电话">
              <span>{{ scope.row.emergency_phone }}</span>
            </el-form-item>
            <el-form-item label="籍贯">
              <span>{{ scope.row.native }}</span>
            </el-form-item>
            <el-form-item label="现居地">
              <span>{{ scope.row.place }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100px"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100px"></el-table-column>
      <el-table-column prop="phone" label="手机" width="120px"></el-table-column>
      <el-table-column prop="city.name" label="区域" width="100px"></el-table-column>
      <el-table-column prop="department.title" label="部门" width="100px"  ></el-table-column>
      <el-table-column prop="job.name" label="岗位" width="100px"></el-table-column>
      <el-table-column prop="join_date" label="入职时间" width="100px"></el-table-column>
      <el-table-column prop="is_on" label="是否在职" width="100px">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.is_on==1"><el-tag>在职</el-tag></span>
          <span style="margin-left: 10px" v-else><el-tag type="info">已离职</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-edit" size="small">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
          <el-button type="warning" icon="el-icon-refresh" size="small" v-if="scope.row.is_on==1" @click="changeIsOn(scope.row.id, scope.row.is_on)">变为离职</el-button>
          <el-button type="info" icon="el-icon-refresh" size="small" v-else @click="changeIsOn(scope.row.id, scope.row.is_on)">变为在职</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-size="condition.number"
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
      condition: {
        name: '',
        job: '',
        department: '',
        city: '',
        phone: '',
        sex: '',
        is_on: '',
        start: 0,
        number: 5,
        dateRange: ''
      },
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
      tableData: [],
      jobs: [],
      total: 0,
      departments: [],
      citys: [],
      timer: '',
      currentPage: 1,
      loading: true,
      btnLoading: false
    }
  },
  methods: {
    //监听页码
    handleCurrentChange(val) {
      this.condition.start = (val - 1) * this.condition.number;
      this.searchTable();
    },
    //监听是否全部人员
    handleIsOn(val){
      console.log(val);
      this.condition.start = 0;
      this.searchTable();
    },

    //更改单个数据状态
    changeIsOn(id, status){
      let on = 0;
      status==1 ? on=0 : on=1;
      axios.put('/api/user', {
          id: id,
          is_on: on
      }).then(res=>{
        if(res.data.code == '200'){
          this.searchTable();
        }
      })
    },

    //查询数据
    searchTable(){
      //获取表格数据
      axios.get('/api/user', {
        params: this.condition
      }).then(res=>{
        this.tableData = res.data.rows;
        this.total = res.data.total;
        this.loading = false;
        this.btnLoading = false;
      });
    },
    searchByButton(){
      //alert(this.condition.dateRange);
      this.condition.start = 0;
      this.searchTable();
      this.btnLoading = true;
    },
    searchByName(){
        this.condition.start = 0;
        if(this.timer){
          clearTimeout(this.timer);
          this.timer = setTimeout(()=>{
            this.searchTable();
          }, 200);
        }else{
          this.timer = setTimeout(()=>{
            clearTimeout(this.timer);
          }, 200);
        }

    },
    init(){
      //获取城市
      axios.get('/api/city')
      .then(res=>{
        this.citys = res.data;
      })
      //获取部门
      axios.get('/api/department')
      .then(res=>{
        this.departments = res.data;
      })
      //获取岗位
      axios.get('/api/job')
      .then(res=>{
        this.jobs = res.data;
      })
      //获取学历
      axios.get('/api/edu')
      .then(res=>{
        this.edus = res.data;
      })
      //获取银行
      axios.get('/api/bank')
      .then(res=>{
        this.banks = res.data;
      })

      //获取表格数据
      this.searchTable();
    },

    //重置表单
    resetForm(){
      this.$refs.condition.resetFields();
      this.searchTable();
    },

    //删除员工
    deleteUser(id){
      this.$confirm('确定删除此用户吗？', '提示', {
        type: 'warning'
      })
      .then(res=>{
        axios.delete('/api/user', {
          params: {
            id: id
          }
        })
        .then(res=>{
          console.log(res);
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
        });
      })
      // .catch(res=>{
      //   this.$message({
      //     message: '已取消删除',
      //     type: 'info'
      //   });
      // })
    }
  },
  mounted(){
    this.init();
  }
}
</script>
<style>
.condition{
  border-bottom:1px solid  #ddd;
  padding:10px 0 20px 0;
  box-sizing: border-box;
}
.demo-table-expand .el-form-item label {
      color: #99a9bf;
}
</style>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand .el-form-item label {
  width: 90px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
.pagination{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
