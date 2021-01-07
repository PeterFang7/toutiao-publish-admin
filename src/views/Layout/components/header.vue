<template>
  <div class="header-container">
    <div>
      <i class="el-icon-s-fold"></i>
      <span>务民科技有限公司</span>
    </div>
  <el-dropdown>
    <span class="el-dropdown-link">
      <img :src="myimg" alt="">
      {{myname}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">设置</el-dropdown-item>
      <el-dropdown-item command="b">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

    </div>
</template>

<script>
import { Icon, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import Vue from 'vue'
Vue.use(Icon).use(Dropdown).use(DropdownMenu).use(DropdownItem)
export default {
  name: 'AppHeader',
  components: {},
  props: {
    myimg: {
      type: String,
      default: ''
    },
    myname: {
      type: String,
      default: '小明'
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  border-bottom: 1px solid #ccc;

  img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
}
</style>
