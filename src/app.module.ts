import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
//配置loginauth的中间件,访问admin下面的页面都要在这个中间件进行权限判断
import { AdminauthMiddleware } from './middleware/adminauth/adminauth.middleware';
import { InitMiddleware } from './middleware/init/init.middleware';
//connect db
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './service/admin/admin.service';
//这里面也有url的设置所以也引入config
//这里面也有url的设置所以也引入config
import { Config } from './config/config';
@Module({
  imports: [
    AdminModule,
    DefaultModule,
    ApiModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestxiaomi', {
      useNewUrlParser: true,
    }), //1.配置数据库连接//2.去要操作的controller所属的module配置数据库模型。
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware)
      .forRoutes(`${Config.adminPath}/*`)
      .apply(InitMiddleware)
      .forRoutes('*'); //*应用于全部。所有的路由都要经过init中间件，这样的话config就有值了。admin就可以写成<%=config.adminPath%>了
  }
}
