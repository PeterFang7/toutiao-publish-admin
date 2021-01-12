<template>
  <div class="article-container">
    <el-card class="filtrate-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelsId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
           <el-date-picker
            v-model="rangeDate"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="lodArticleList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="data-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 <span>{{ totalCount }}</span> 条结果:</span>
      </div>
      <!-- 文章列表 -->
      <el-table
        v-loading="loading"
        :data="articleList"
        :current-row-key="articleList.id"
        style="width: 100%">
        <el-table-column
          label="封面"
          >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              lazy
              >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <!-- <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="" class="article-cover">
            <img v-else src="./img/no-cover.png" alt="" class="article-cover"> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          label="状态"
          >
          <template slot-scope="scope">
            <!-- <el-tag v-if="scope.row.status === 0" >草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" >待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" >1审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" >审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" >已删除</el-tag> -->
             <el-tag :type="articleStatus[scope.row.status].type" >{{ articleStatus[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
         <el-table-column
          prop="pubdate"
          label="发布时间"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button
              size="small"
              circle
              type="primary"
              icon="el-icon-edit"
              @click="$router.push('/publish?id=' + scope.row.id)"
              ></el-button>
            <el-button
              size="small"
              circle
              type="danger"
              icon="el-icon-delete"
              @click="onRemove(scope.row.id)"
              ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      class="article-paging"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        :current-page.sync="page"
        @current-change="onCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle, getArticleChannel, removeArticle } from '@/api/article.js'

export default {
  name: 'articleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        region: '',
        resource: ''
      },
      rangeDate: null, // 筛选日期范围
      articleList: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'warning' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ],
      totalCount: 0, // 数据总数
      pageSize: 10, // 每页数量
      status: null, // 文章状态
      channels: [], // 频道列表
      channelsId: null, // 频道id
      loading: true, // 加载状态
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.lodArticleChannel()
    this.lodArticleList(1)
  },
  mounted () {},
  methods: {
    // 获取文章列表
    lodArticleList (page = 1) {
      this.loading = true // 开始获取数据打开loding
      getArticle({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelsId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        this.articleList = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.loading = false // 数据获取完成关闭loding
      })
    },

    // 获取页码
    onCurrentChange (page) {
      // console.log(page)
      this.lodArticleList(page)
    },

    // 文章频道
    lodArticleChannel () {
      getArticleChannel().then(res => {
        this.channels = res.data.data.channels
      })
    },

    // 删除文章
    onRemove (articleId) {
      console.log(articleId)
      this.$confirm('确定删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除文章
        removeArticle(articleId.toString()).then(res => {
          // 数据删除成功，更新页面数据
          this.lodArticleList(this.page)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.filtrate-card {
  margin-bottom: 20px;
}
.article-paging {
  margin-top: 10px;
}
.article-cover {
  height: 70px;
  background-size: cover;
}
</style>
