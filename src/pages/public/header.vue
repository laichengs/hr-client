<template>
  <div id="app">
    <img src="../../assets/logo.png" alt="" class="logo">
    <!-- <span class="title">美今管家人员管理系统</span> -->
    <ul class="header-operations">
      <li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=241164&site=qq&menu=yes">联系管理员</a></li>
      <li @click="showTip">帮助</li>
    </ul>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="dialog-content">
        <span>1.本系统内部开发，仅为美今管家内部之所用。</span>
        <span>2.系统开发阶段，如有bug请及时反馈。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default{
  data(){
    return {
      dialogVisible: false
    }
  },
  methods:{
    showTip(){
      this.dialogVisible = true;
    }
  }
}
</script>
<style>
.el-dialog__body{
  padding:0 20px;
  line-height: 2;
}
</style>
<style scoped>
.el-header{
  padding:0;
}
.dialog-content{
  display: flex;
  flex-direction: column;
}
.header-operations{

}
.header-operations li, .header-operations li a{
   width: 120px;
   display: inline-block;
   color: #fff;
}
#app{
    height:80px;
    display: flex;
    align-items: center;
    line-height: 80px;
    justify-content: space-between;
    padding-left: 40px;
    background: #409EFF;
}
.logo{
  height:50%;
}
.title{
  color: #fff;
  font-size:22px;
}
</style>
