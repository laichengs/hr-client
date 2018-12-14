<template>
  <div id="#app">
    <el-row :gutter="40">
      <el-col :span="6" v-for="(item, index) in totals" :key="index">
        <div class="box">
          <div class="box-top">
              <i :class="'iconfont icon-' + item.icon" :style="'font-size:40px;color:'+item.style"></i>
              <div class="title-box">
                  <h4 class="title">{{item.title}}</h4>
                  <span class="num">{{item.num}}人</span>
              </div>
          </div>
          <div class="describe-box">
            <span class="describe"><i class="el-icon-info"></i> {{item.describe}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="filterTime">
      <el-date-picker
        v-model="dateRange"
        size="small"
        type="daterange"
        align="left"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="small" @click="filterData">按时间筛选</el-button>
    </div>
    <el-table
      :data="tableData"
      show-summary
      border
      size="small"
      style="width: 100%;">
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
import axios from 'axios'
export default{
  data(){
    return {
      dateRange: '',
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
      totals: [
        {
          title: '本月入职',
          describe: '本月总入职人数（包括离职）',
          icon: 'benyue',
          style: '#409EFF',
          num: '0'
        },
        {
          title: '本月离职',
          describe: '本月总离职人数',
          icon: 'benyue',
          style: '#F56C6C',
          num: '0'
        },
        {
          title: '本周入职',
          describe: '本周总入职人数（包括离职）',
          icon: 'benzhou',
          style: '#67C23A',
          num: '0'
        },
        {
          title: '本周离职',
          describe: '本周总离职人数',
          icon: 'benzhou',
          style: '#E6A23C',
          num: '0'
        },
      ],
      tableData: [
        {
          city: '深圳',
          join_real: 3,
          join_total: 5,
          leave: 2
        }
      ],
      nums: {}
    }
  },
  methods: {
    init(){
      //获取列表数据汇总
      axios.get('/api/total')
      .then(res=>{
        for(var i=0; i<res.data.length; i++){
          this.totals[i].num = res.data[i];
        }
      })

      //获取城市数据
      this.getTableData();
    },

    //获取城市具体数据
    getTableData(){
      axios.get('/api/table',{
        params: {
          dateRange: this.dateRange
        }
      }).then(res=>{
        console.log(res);
        if(res.data.code == '200'){
          this.tableData = res.data.result;
        }
      })
    },

    //按时间筛选
    filterData(){
      this.getTableData();
    }
  },
  mounted(){
    this.init();
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
.filterTime{
  padding: 30px 0;
}
.num{
  font-size: 20px;
}
.describe{
  font-size: 12px;
  color: #999;
}
</style>
