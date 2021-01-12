import request from '@/utils/request.js'

// 获取文章列表
export const getArticle = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取文章频道
export const getArticleChannel = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const removeArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 添加文章
export const addArticle = (data, draft = false) => {
  console.log(draft)
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft: draft // 是否为草稿（true为草稿）
    },
    data
  })
}

// 获取指定文章
export const getArticleData = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 修改文章
export const updataArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft: draft // 是否为草稿（true为草稿）
    },
    data
  })
}
