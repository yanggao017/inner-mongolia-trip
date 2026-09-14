# 国庆旅行攻略网页

这是一个纯静态网页，入口为 `index.html`。输入密码后先选择两份攻略，再进入 `guide1.html` 或 `guide2.html` 查看详细安排。页面没有使用 AI 生成图片，也没有嵌入来源不明的网络图片；景色部分用路线卡片和 CSS 示意保持版式完整。以后修改行程时，直接编辑对应攻略页面即可，部署后的网址不需要更换。

## 本地查看

在项目目录执行：

```bash
python3 -m http.server 8000 --directory travel-guide
```

然后打开 <http://localhost:8000>，体验密码为 `guoqing2026`。

密码门由浏览器端 JavaScript 实现，适合和同行者分享时做简单访问控制，不等同于服务器端安全认证。部署到 Cloudflare Pages、Netlify 或 Vercel 后即可获得公网网址；如需要真正的密码保护，应在托管平台配置访问鉴权。

## GitHub + Cloudflare Pages 部署

1. 在 GitHub 新建一个仓库，把 `travel-guide` 文件夹中的四个文件上传到仓库根目录（或上传整个项目后，在 Cloudflare 中指定 `travel-guide` 为根目录）。
2. Cloudflare 控制台进入 **Workers & Pages → Create application → Pages → Connect to Git**，选择这个 GitHub 仓库。
3. 纯静态页面不需要构建命令：Build command 留空，Output directory 填 `/`（如果仓库根目录就是 `travel-guide`，则填 `travel-guide`）。
4. 部署完成后使用 Cloudflare 分配的 `*.pages.dev` 地址；以后每次推送修改，Cloudflare 会自动重新部署，链接保持不变。
5. 修改 `app.js` 顶部的 `ACCESS_PASSWORD` 可更换同行密码。因为密码校验发生在浏览器端，页面源代码里仍能看到密码；要保护敏感资料，请改用 Cloudflare Access 等服务端鉴权。
