# Zzz 觅食冲刺队-Ctrip

## 项目介绍

旅游美食网站主要向用户推荐当地特色美食、餐厅和小吃摊等，以及提供游客在陌生城市中找到美食的建议。旨在帮助游客更好的了解当地美食文化并尝试不同美味的美食。

## 成果预览

线上演示地址：[http://139.224.27.184:3000/](http://139.224.27.184:3000/)（移动端）

成果展示：
![总览图](./public/总览图.gif)

掘金文章沉淀：

- [瀑布流（无限加载）4 种不同的布局方式](https://juejin.cn/post/7229645709556301882)
- [在服务端渲染时导入必须使用客户端 window 对象的高德地图组件+解决‘window is not defined’的报错](https://juejin.cn/post/7229984415329108024)

## 技术栈

- `Next.js` + `TypeScript` + `React Hooks` + `AntD Mobile` + `Sass`+`eslint` + `Node` + `高德地图 API`

## 主要实现功能

1. 首页

   - [x] 搜索框
   - [x] banner
   - [x] 筛选模块，支持滑动吸顶和点击吸顶
   - [x] 餐厅列表，支持加载更多

2. 详情页

   - [x] 头部图片轮播，视频播放
   - [x] 餐厅信息展示：餐厅名，人均，菜系，营业时间，地址，电话等
   - [x] 地图详情页
   - [x] 用户点评
   - [x] 瀑布流推荐模块

## 项目分工

姓名   | 工作内容 
:--- | :---: 
赵于婷 |主页：（搜索框、Banner组件、筛选模块、餐厅列表）<br>餐厅详情页：（轮播图、电话动作面板、点评模块、地图页、瀑布流推荐）
周志杰 |项目架构搭建、页面配置、后端接口、数据爬虫、餐厅详情页基本信息组件、主界面筛选模块修改
## 项目亮点
- 基于 Next.js、Typescript、Sass开发
- 采用Grid布局瀑布流
- 动态导入高德地图组件
- 采用eslint进行代码linting
- 使用PM2进行项目部署
- 使用prettier统一代码规范


## 项目启动

```bash
# 安装依赖
npm install
# 启动开发环境
npm run dev
# 项目打包
npm run build
# 项目启动
npm run start
```

本地运行地址 [http://localhost:3000](http://localhost:3000)

## git 提交规范

> 使用 Conventional Commits（约定式提交）

feat: 新功能
fix: bug 修复
docs: 文档更新
style: 代码样式调整（不影响代码功能的变动）
refactor: 重构代码（既不是新增功能也不是修改 bug）
test: 增加或修改测试代码
chore: 构建过程或辅助工具的变动

## 项目参考链接

- [Next 文档](https://www.nextjs.cn/docs)
- [Next 学习视频](https://www.youtube.com/watch?v=mTz0GXj8NN0)
- [Sass 文档](https://www.sasscss.com/guide)
- [Ant Design 组件库](https://mobile.ant.design/zh/guide/quick-start/)
- [高德地图 API](https://lbs.amap.com/api/javascript-api-v2/summary)
- [携程美食](https://m.ctrip.com/webapp/gourmet/food/fooddetail/2/15098466.html?ishideheader=true&navBarStyle=white&seo=0&from=https%3A%2F%2Fm.ctrip.com%2Fwebapp%2Fgourmet%2Ffood%2FhomeList%2Faddress.html%3Fnew%3D1%26isHideNavBar%3DYES%26ishideheader%3Dtrue%26seo%3D0%26from%3Dhttps%253A%252F%252Fm.ctrip.com%252Fhtml5%252F)
