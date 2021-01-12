<template>
    <div class="publish-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-form :model="article" ref="publish-form" :rules="publishRules" label-width="70px" class="demo-ruleForm" size="small">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
            <el-tiptap v-model="article.content" :extensions="extensions" height="350" placeholder="请输入文章内容"></el-tiptap>
          </el-form-item>
          <el-form-item label="封面" prop="resource">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel">
            <el-select v-model="article.channel_id" placeholder="请选频道">
              <el-option v-for="(channel, index) in channels" :label="channel.name" :value="channel.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish(false)">{{ this.$route.query.id ? '立即修改' : '立即发布' }}</el-button>
            <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import { getArticleChannel, addArticle, getArticleData, updataArticle } from '@/api/article.js'
import { uploadImage } from '@/api/image.js'
import {
  // 需要的 extensions
  ElementTiptapPlugin,
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  FontSize,
  Fullscreen,
  Image,
  TextColor,
  TextHighlight
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'

Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})

export default {
  name: 'publishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      channels: [], // 频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面图片数量
          images: [] // 封面图片
        },
        channel_id: null
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new FontSize(),
        new Image({
          // 默认是将图片生成 base64 字符串和内容存储在一起
          // 将上传的数据以地址的方式插入到文本内容中
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用FormData
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new TextColor(),
        new TextHighlight(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Fullscreen()
      ],
      publishRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator: (rule, value, callback) => {
              // 验证失败
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.lodArticleChannel()
    // 判断是否为编辑模式
    if (this.$route.query.id) {
      this.lodArticleData(this.$route.query.id)
    }
  },
  mounted () {},
  methods: {
    // 获取频道数据
    lodArticleChannel () {
      getArticleChannel().then(res => {
        this.channels = res.data.data.channels
      })
    },
    // 文章发表
    onPublish (draft) {
      // 表单验证
      this.$refs['publish-form'].validate((valid) => {
        if (!valid) {
          // 验证失败
          return
        }
        // 表单验证成功
        if (this.$route.query.id) {
          // 修改文章
          updataArticle(this.$route.query.id, this.article, draft).then(res => {
            this.$message({
              message: '文章修改成功',
              type: 'success'
            })
            this.$router.push('/article')
          })
        } else {
        // 添加文章
          addArticle(this.article, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿成功' : '文章发表成功'}`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        }
      })
    },
    // 获取文章数据信息
    lodArticleData (articleId) {
      getArticleData(articleId).then(res => {
        console.log(res)
        this.article = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
