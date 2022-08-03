# Vue2.7.x-Admin-Template

A vue2.7.x admin template with Element UI & JSX & axios & iconfont & permission control & lint

## 安装依赖
**所有依赖统一使用 `npm` 安装**

```bash
# 安装依赖
npm install

# 运行开发
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)


## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 项目目录简介
```
├── build                   // 打包配置
├── mock                    // mock 文件
├── public
├── src
│   ├── App.vue
│   ├── assets              // 静态资源文件
│   ├── components          // 公共组件
│   ├── icons               // icons
│   ├── layout              // layout布局
│   ├── main.js
│   ├── permission.js
│   ├── router              // 路由
│   ├── services
│   ├──── apis              // 接口地址
│   │   ├── hbcenter        // hbcenter 接口
│   │   ├── hbexpert        // hbexpert 接口
│   │   ├── hbproject       // hbproject 接口
│   ├── settings.js
│   ├── store
│   ├── styles              // 全局样式
│   │   ├── element-ui.scss
│   │   ├── index.scss
│   │   ├── mixin.scss
│   │   ├── sidebar.scss
│   │   ├── transition.scss
│   │   └── variables.scss
│   ├── utils               // 工具类
│   │   ├── auth.js         // SDK
│   │   ├── index.js
│   │   ├── request.js
│   │   └── validate.js     // 校验
│   └── views               // Pages
│       ├── 404.vue
│       ├── dashboard
│       │   └── index.vue
│       └── login
│           └── index.vue
└── vue.config.js
```