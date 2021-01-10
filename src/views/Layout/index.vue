<template>
<el-container class="loyout-container">
  <el-aside width="auto" >
    <app-aside class="aside-container" :iscollapse="isCollapse" />
  </el-aside>
  <el-container>
    <el-header class="header" style="height: 50px;">
      <app-header :myimg='user.photo' :myname='user.name' @clickIcon="onclick" :myisCollapse="isCollapse" />
    </el-header >
    <el-main>
        <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<script>
// import { Container, Aside, Header, Main } from 'element-ui'
// import Vue from 'vue'
import AppAside from './components/aside'
import AppHeader from './components/header'
import { getUserMessage } from '@/api/user'
// Vue.use(Container).use(Aside).use(Header).use(Main)
export default {
  name: 'LoyoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.lodUserMessage()
  },
  mounted () {},
  methods: {
    lodUserMessage () {
      getUserMessage().then(res => {
        this.user = res.data.data
        console.log(this.user)
      })
    },
    onclick () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.loyout-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  .aside-container {
    height: 100%;
  }

  .header {
    padding: 0;
    // height: 100px;
    // display: flex;
    // justify-content: center;
    // width: 100%;
  }
}
</style>
