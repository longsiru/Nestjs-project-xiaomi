//user login
//1.把输入表格的数据传输到后台。传输到后台之后首先验证验证码是否输入正确，如果验证码正确，
//2.然后获取用户名和密码，然后再去数据库查询是否有匹配的用户名和密码。如果匹配就登录成功。
//3.用到mongodb。需要安装nestjs/mongoose以及mongoose模块。npm install --save @nestjs/mongoose mongoose
//4.配置数据库连接。在app.module中配置数据库连接。您必须在终端/命令提示符中运行monogorestore，而不是在mongo控制台中。
//mongorestore --host 127.0.0.1 --port 27017 -d nestxiaomi -c role documents/mongodb/nestxiaomi/role.bson
//5.定义schema--AdminSchema
//6.在控制器对应的 Module 中配置 Model
