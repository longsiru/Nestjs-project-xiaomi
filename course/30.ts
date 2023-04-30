//user login
//1.把输入表格的数据传输到后台。传输到后台之后首先验证验证码是否输入正确，如果验证码正确，
//2.然后获取用户名和密码，然后再去数据库查询是否有匹配的用户名和密码。如果匹配就登录成功。
//3.用到mongodb。需要安装nestjs/mongoose以及mongoose模块。npm install --save @nestjs/mongoose mongoose
//4.配置数据库连接。在app.module中配置数据库连接。
