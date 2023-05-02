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
//22. 对登陆进行验证。没有login就不能进入。可以利用守卫和中间件来做，这里我们创建中间件。nest g mi middleware/adminauth
//23. 需要在跟模块配置中间件。需要继承nestmodule，实现config方法
//24. 如何判断当前用户有没有登陆，要看用户信息有没有保存在session

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

//30.user login
//1.把输入表格的数据传输到后台。传输到后台之后首先验证验证码是否输入正确，如果验证码正确，
//2.然后获取用户名和密码，然后再去数据库查询是否有匹配的用户名和密码。如果匹配就登录成功。
//3.用到mongodb。需要安装nestjs/mongoose以及mongoose模块。npm install --save @nestjs/mongoose mongoose
//4.配置数据库连接。在app.module中配置数据库连接。您必须在终端/命令提示符中运行monogorestore，而不是在mongo控制台中。
//mongorestore --host 127.0.0.1 --port 27017 -d nestxiaomi -c role documents/mongodb/nestxiaomi/role.bson
//5.定义schema--AdminSchema
//6.在控制器对应的 Module 中配置 Model
//7.在服务service里面使用 InjectModel 获取数据库 Model 实现操作数据库  nest g s service/admin  在app.module里面去掉adminservice
//8.在admin module引入adminservice
//9.在对应的控制器里面使用service，在login使用,//console.log(await this.adminService.findAll());
//10.实现登陆功能
//11.login.ejs --form action="/admin/login/doLogin"
//12.login.controller @post

//32.nestjs 实现登陆，退出登录功能，配置公共的成功，失败页面。
