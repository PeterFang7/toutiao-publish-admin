<template>
  <div class="header-container">
    <div>
      <i :class="{
        'el-icon-s-fold': myisCollapse,
        'el-icon-s-unfold': !myisCollapse
      }" @click="onclick">
      </i>
      <span>务民科技有限公司</span>
    </div>
  <el-dropdown>
    <span class="el-dropdown-link">
      <img :src="myimg" alt="">
      <span class="userName" style="vertical-align: 15%">{{ myname }}</span>
      <i class="el-icon-arrow-down el-icon--right" style="vertical-align: 15% ;"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item >设置</el-dropdown-item>
      <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

    </div>
</template>

<script>
import { Icon, Dropdown, DropdownMenu, DropdownItem, MessageBox } from 'element-ui'
import Vue from 'vue'
Vue.use(Icon).use(Dropdown).use(DropdownMenu).use(DropdownItem)
Vue.prototype.$confirm = MessageBox.confirm
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
    },
    myisCollapse: {
      type: Boolean
      // default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onclick () {
      this.$emit('clickIcon')
    },
    onLogout () {
      this.$confirm('确定退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除用户登录标记
        window.localStorage.removeItem('user')
        // 跳转到登录页
        this.$router.push('/login')
      })
    }
  }
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
  .userName {
    margin-left: 5px;
  }

}
</style>
