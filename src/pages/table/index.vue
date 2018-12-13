<template>
  <div id="#app">
    <el-row :gutter="40">
      <el-col :span="6" v-for="(item, index) in totals" v-key="index">
        <div class="box">
          <div class="box-top">
              <i :class="'iconfont icon-' + item.icon" :style="'font-size:40px;color:'+item.style"></i>
              <div class="title-box">
                  <h4 class="title">{{item.title}}</h4>
                  <span class="num">300人</span>
              </div>
          </div>
          <div class="describe-box">
            <span class="describe"><i class="el-icon-info"></i> {{item.describe}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top: 40px">
      <el-table-column
        prop="city"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="join_real"
        label="实际入职">
      </el-table-column>
      <el-table-column
        prop="leave"
        label="离职">
      </el-table-column>
      <el-table-column
        prop="join_total"
        label="总入职">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default{
  data(){
    return {
      totals: [
        {
          title: '本月入职',
          describe: '本月总入职人数（包括离职）',
          icon: 'benyue',
          style: '#409EFF'
        },
        {
          title: '本月离职',
          describe: '本月总离职人数',
          icon: 'benyue',
          style: '#F56C6C'
        },
        {
          title: '本周入职',
          describe: '本周总入职人数（包括离职）',
          icon: 'benzhou',
          style: '#67C23A'
        },
        {
          title: '本周离职',
          describe: '本周总离职人数',
          icon: 'benzhou',
          style: '#E6A23C'
        },
      ],
      tableData: [
        {
          city: '深圳',
          date: '2013-10-09',
          join_real: 3,
          join_total: 5,
          leave: 2
        }
      ]
    }
  }
}
</script>
<style scoped>
#app{
  padding: 20px;
  box-sizing: border-box;
}
.box{
  height: 150px;
  box-shadow: 0px 0px 20px 5px #f2f2f2;
  padding: 20px 30px;
  box-sizing: border-box;
}
.box-top{
  display: flex;
  height: 80%;
  justify-content: space-between;
  align-items: center;
}
.title-box{
  text-align: right;
}
.title{

}
.num{
  font-size: 20px;
}
.describe{
  font-size: 12px;
  color: #999;
}
</style>
