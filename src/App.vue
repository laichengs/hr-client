<template>
  <div id="app">
    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <my-nav></my-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myHeader from '@/pages/public/header'
import myNav from '@/pages/public/nav'
export default {
  name: 'App',
  components: {
    myHeader, myNav
  }
}
</script>

<style scoped>
.el-header{
  padding:0;
  height:80px !important;
}
</style>
