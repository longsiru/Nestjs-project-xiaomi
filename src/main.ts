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

//33.nestjs配置模版全局变量，配置可修改的后台地址，扩展模版方法。
//全局设置完成之后就可以在所有的模版里面使用了。在中间件里面设置全局变量。res.local.userinfo = userinfo
//全局设置完成之后就可以在所有的模版里面使用了。在中间件里面设置全局变量。res.local.userinfo = userinfo
//配置可修改的后台地址。现在我们的地址是admin/login别人可能会猜到，所以我们要配置我们自己的url，需要把路由配置成动态的路由。把admin变成一个变量，让我们可以去修改他。
//在config目录下面建立一个config.ts，新建一个confin的类，定义静态的属性。剋通过config。来获取里面的变量。然后配置动态的后台地址。还要配置全局的模版变量，在模版里面把对应的admin path来配置一下。
//在中间里面配置全局的url
//在nestjs里面扩展模版方法。在 extend 目录里面新建 helper.js，在模版里面扩展一个方法来处理对内业务逻辑。比如输出一个日期的时候可以输出一个格式化日期，也就是在<%=%>里面可以调用方法。

//34.基于角色的权限管理。（rbac role based access control），用户rbac管理树形图。
//不同角色登录到页面，显示的内容不一样，实现的功能不一样。
//用户管理，角色管理，权限管理。角色和权限之间是多对多的关系，要实现这种关系需要一个表格来保存两个表之间的关系。。
//首先实现角色的crud
//然后实现用户的crud，增加修改用户的时候需要选择角色
//实现权限的crud，菜单页面。
//实现权限的授权功能。保存一些地址
//判断当前登陆的用户是否有访问彩蛋的权限。
//根据当前登陆账户的角色信息动态显示左侧菜单。
//角色和用户是1对多的关系。
