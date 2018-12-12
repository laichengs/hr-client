<template>
<div id="app">
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="面试部门" style="width:300px;" prop="department">
          <el-select v-model="form.department" placeholder="请选择所在部门">
            <el-option v-for="item in departments" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="面试岗位" style="width:300px;" prop="job">
          <el-select v-model="form.job" placeholder="请选择岗位">
            <el-option v-for="item in jobs" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="区域" style="width:300px;" prop="city">
          <el-select v-model="form.city" placeholder="请选择城市">
            <el-option v-for="item in citys" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="入职日期" style="width:300px;" prop="join_date">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.join_date" value-format="timestamp"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="转正日期" style="width:300px;" prop="become_date">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.become_date" value-format="timestamp"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="民族" style="width:300px;" prop="nation">
          <el-select v-model="form.nation" placeholder="请选择民族">
            <el-option label="汉族" value="1"></el-option>
            <el-option label="其它" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="毕业院校" style="width:300px;" prop="school">
            <el-input v-model="form.school"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开户行" style="width:300px;" prop="bank">
          <el-select v-model="form.bank" placeholder="请选择银行">
            <el-option v-for="item in banks" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="银行卡号" style="width:300px;" prop="bank_card">
            <el-input v-model="form.bank_card"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="开始日期" style="width:300px;" prop="start">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.start" value-format="timestamp"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结束日期" style="width:300px;" prop="end">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.end" value-format="timestamp"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="劳动期限" style="width:300px;" prop="deadline">
            <el-input v-model="form.deadline"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="姓名" style="width:300px;" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证号" style="width:300px;" prop="card">
          <el-input v-model="form.card"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="婚姻状况" style="width:300px;" prop="marriage">
          <el-select v-model="form.marriage" placeholder="请选择婚姻状况">
            <el-option label="已婚" value="1"></el-option>
            <el-option label="未婚" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio border label="男"></el-radio>
            <el-radio border label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" value-format="timestamp"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="学历" prop="edu">
          <el-select v-model="form.edu" placeholder="请选择学历">
            <el-option v-for="item in edus" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="手机号码" style="width:300px">
          <el-input v-model="form.phone" placeholder="本人电话"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="紧急人" style="width:300px">
          <el-input v-model="form.emergency" placeholder="紧急联系人姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系电话" style="width:300px">
          <el-input v-model="form.emergency_phone" placeholder="紧急联系人电话"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="籍贯地" prop="native">
            <el-input v-model="form.native"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="现居地" prop="place">
            <el-input v-model="form.place"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
  <el-button type="primary" @click="onSubmit">增加用户</el-button>
  <el-button @click="resetForm">重置</el-button>
</el-form-item>
  </el-form>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      edus: [],
      banks: [],
      citys: [],
      departments: [],
      jobs: [],
      form: {
        department: '', //部门
        job: '', //工作
        city: '', //城市
        join_date: '', //入职日期
        become_date: '', //转正日期
        nation: '', //民族
        school: '', //学校
        bank: '', //银行
        bank_card: '', //银行卡号
        start: '', //开始日期
        end: '', //结束日期
        deadline: '', //劳动期限
        name: '', //姓名
        card:'',  //身份证号
        marriage: '', //婚姻状况
        sex: '',  //性别
        birthday: '',  //出生日期
        edu: '',    //学历
        phone: '',  //手机号码
        emergency: '',  //紧急联系人
        emergency_phone: '',  //紧急联系电话
        native: '',  //籍贯地
        place: ''  //现居地
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post('/api/user',{
        info: this.form
      })
      .then(res=>{
        if(res.data.code == '200'){
          //重置表单
          this.$refs.form.resetFields();
          //弹出信息提示窗口
          this.$message({
            message: '恭喜您，添加成功',
            type: 'success'
          });

        }
      })
    },

    resetForm() {
      this.$refs.form.resetFields();
    },

    init(){
      //获取城市
      axios.get('/api/city')
      .then(res=>{
        console.log(res);
        this.citys = res.data;
      })
      //获取部门
      axios.get('/api/department')
      .then(res=>{
        console.log(res);
        this.departments = res.data;
      })
      //获取岗位
      axios.get('/api/job')
      .then(res=>{
        console.log(res);
        this.jobs = res.data;
      })
      //获取学历
      axios.get('/api/edu')
      .then(res=>{
        console.log(res);
        this.edus = res.data;
      })
      //获取银行
      axios.get('/api/bank')
      .then(res=>{
        console.log(res);
        this.banks = res.data;
      })
    }
  },
  mounted(){
    this.init();
  }
}
</script>
<style scoped>
/* #app {
  padding: 20px;
} */
</style>
