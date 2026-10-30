# Vale's Blog

基于 [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)（MIT，见 [LICENSE](./LICENSE)）及 [joy-blog](https://github.com/Codefreyy/joy-blog) 的布局改造。

## 常用命令

```bash
npm run dev     # 本地预览 http://localhost:3000
npm run build   # 生产构建
npm run serve   # 运行构建产物
```

## 写文章

在 `data/blog/` 下新建 `.mdx` 文件：

```mdx
---
title: 文章标题
date: '2026-11-01'
tags: [javascript]
summary: 一句话摘要
---

正文……
```

## 配置

- 站点信息、社交链接：`data/siteMetadata.js`
- 导航：`data/headerNavLinks.ts`
- 关于我：`data/authors/default.mdx`
- 评论（Giscus）：设置 `NEXT_PUBLIC_GISCUS_REPO`、`NEXT_PUBLIC_GISCUS_REPOSITORY_ID`、`NEXT_PUBLIC_GISCUS_CATEGORY`、`NEXT_PUBLIC_GISCUS_CATEGORY_ID` 环境变量后自动显示
