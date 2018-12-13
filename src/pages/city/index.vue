<template>
  <div id="app">
    <div class="add-btn">
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        res="saveTagInput"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" type="primary" @click="showInput">+ 添加城市</el-button>
    </div>
    <el-tag
  :key="tag.id"
  v-for="tag in citys"
  closable
  :disable-transitions="false"
  @close="handleClose(tag.id)">
  {{tag.name}}
</el-tag>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      citys: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    init(){
      axios.get('/api/city').then(res=>{
        console.log(res);
        this.citys = res.data;
      })
      this.inputValue = '';
    },

    handleClose(id){
      this.$confirm('你真的要删除这个城市吗？该操作可能影响已添加数据的正常显示', '提示')
      .then(res=>{
        axios.delete('/api/city', {
          params: {
            id: id
          }
        }).then(response=>{
          if(response.data.code = '200'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.init();
          }
        });
      })
      .catch(err=>{
        console.log(err);
      });
    },

    handleInputConfirm(){
      this.inputVisible = false;
      axios.post('/api/city', {
        name: this.inputValue
      }).then(response=>{
        if(response.data.code = '200'){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.init();
        }
      });
    },

    showInput(){
      this.inputVisible = true;
    }
  },
  mounted(){
    this.init();
  }
}
</script>
<style scoped>
 #app {
  padding: 20px;
}
.add-btn{
  margin-bottom: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {

  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;

  vertical-align: bottom;
}
</style>
