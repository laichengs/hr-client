<template>
  <div id="container">
    <router-link :to="{path: item.link}" v-for="(item, index) in navLists">
        <div class="nav-item" :class="index == currentIndex ? 'active': ''" @click="switchNav(index)">
            <i :class="[item.iconType, 'nav']"></i>
            <span class="title">{{item.title}}</span>
        </div>
    </router-link>
  </div>
</template>
<script>
export default{
  data(){
    return {
      currentIndex: 0,
      navLists: [
        {
          iconType: 'el-icon-picture',
          link: '/',
          title: '汇总信息'
        },
        {
          iconType: 'el-icon-tickets',
          link: 'register',
          title: '登记信息'
        },
        {
          iconType: 'el-icon-date',
          link: 'home',
          title: '员工信息'
        },
        {
          iconType: 'el-icon-plus',
          link: 'user',
          title: '添加员工'
        },
        {
          iconType: 'el-icon-location',
          link: 'city',
          title: '城市管理'
        },
        {
          iconType: 'el-icon-rank',
          link: 'department',
          title: '部门管理'
        },
        {
          iconType: 'el-icon-printer',
          link: 'job',
          title: '职位管理'
        }
      ]
    }
  },
  methods: {
    switchNav(index){
        this.currentIndex = index;
    }
  }
}
</script>
<style scoped>
#container{
  height:680px;
  box-sizing: border-box;
  background: #fbfbfb;
  border-right:1px solid #eee;
}
.nav{
  padding-right:10px;
  color: #303133;
}
.nav-item{
  padding: 15px 30px;
  transition: all .5s;
}
.title{
  color: #303133;
}
.nav-item.active .title{
  color: #409EFF;
}
.nav-item.active .nav{
  color: #409EFF;
}
.nav-item:hover{
  background: #ecf5ff;
  cursor: pointer;
  color: #409EFF;
}
.nav-item:hover .title{
  color: #409EFF;
}
.nav-item:hover .nav{
  color: #409EFF;
}

</style>
