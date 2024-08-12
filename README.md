# 兴趣圈后端

## MidwayJS + PostgreSQL

这个里面的代码和xingququan那个库里的代码基本一致。

GitHub Actions里也有提交后自动打包的配置。

已经部署到了阿里云服务器上，url: http://47.99.174.164:7001/
（注意有jwt鉴权，所以需要登录获取token后才能进行数据传递）

### 两种启动方式：

**①下载源代码后在根目录下依次执行：**

`npm install`

`npm run build`

`npm run dev`



**②使用pm2:**

先全局安装pm2：`npm install pm2 -g`

再在根目录下依次执行：

`npm install`

`npm run build`

`npm prune --production`

`pm2 start ./bootstrap.js --name backend`



### 若启动不起来，可能的原因：

①7001端口被占用了，请先关闭7001端口，再启动。

②数据库连接失败了，请检查数据库配置文件或确认本地有没有安装数据库。

我用的**PostgreSQL**，在`config/config.default.ts`里修改相应配置，主要是`database`和`password`两项，改成自己的数据。 初始synchronize为true，会同步表格信息。

