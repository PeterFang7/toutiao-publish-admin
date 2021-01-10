<template>
    <el-menu
      :collapse="iscollapse"
      default-active="/"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      >
      <el-menu-item index="/">
        <i class="iconfont iconzhuye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont iconicon_found_img"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont iconcomment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont iconziyuan191"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
import Vue from 'vue'

Vue.use(Menu).use(Submenu).use(MenuItem).use(MenuItemGroup)

export default {
  name: 'AppAside',
  components: {},
  props: {
    iscollapse: {
      type: Boolean,
      befault: true
    }
  },
  data () {
    return {
      // isCollapse: true
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  margin-right: 10px;
  padding-left: 5px;
}
</style>
