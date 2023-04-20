//1.删除掉不用的文件（app.controller,controller.test,app.service）,在app.module里面把控制器和service删除。
//2.创建项目所需要的模块。小米商城有三个大的模块。admin-后台，default-pc端，api.
//3.创建admin控制器。main，default，login。
//4.在控制器里面配置路由。
//5.创建service。放在公共区域（src）.在app.module里面将tools service删掉，那个模块需要就引入带那个模块。
//6.当然这个项目还有其他的目录所以路由配置不能写死了。后台要配置统一的路由，所以在src文件夹里面我们放一个配置文件夹，config
//7.之后我们要扩展模版引擎，想在模版引擎里面调用一些方法。这样的话可以把这些方法放在一个文件里，extend-helper
//8.然后还有中间件，放在middleware 文件夹。
//9.创建interface(验证传入数据的合法性)和schema(放数据表的schema)
//10.配置模版引擎，cookie，session。//npm i cookie-parser express-session ejs --save
//npm i express-session --save
//npm i -D @types/express-session --save
//npm instlal cookie-parser --save
//npm i -D @types/cookie-parser --save
//11.安装完成之后，去main.ts 配置cookie，sessoin。
//12.在根目录创建两个文件夹。public（放静态资源，css，js，image），views（放模版）
//13.views- admin， default
//14.进行模版渲染admin-login，login controller @render（admin/login）
//15.admin添加两个文件夹main，manager
//16.admin- main 添加index.ejs
//16.在main controller，进行模版渲染@render（admin/main/index）
//17.考虑把公共的ejs，抽离成一个，然后在需要的ejs中引入。---在views新建文件夹public。
//18.模版分离：views-public-page_header.ejs(公共的header)，page_aside.ejs(公共的aside)，，然后进行抽离。
//19。后台的静态资源放到后台admin文件夹，前台的静态资源放到前台的静态资源的文件夹。
//20.局部刷新，用到iframe id="rightMain"，然后在a tag 里面写target="rightMain"
//21.计算窗口高度，js
//21. login生成验证码，用svg captcha  --npm install --save svg-captcha,安装完成之后引入 tools

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  //配置模板引擎
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  //配置 cookie 中间件
  app.use(cookieParser('this signed cookies'));

  //配置 session 的中间件
  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 30, httpOnly: true },
      rolling: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
