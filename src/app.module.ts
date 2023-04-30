import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
//配置loginauth的中间件,访问admin下面的页面都要在这个中间件进行权限判断
import { AdminauthMiddleware } from './middleware/adminauth/adminauth.middleware';
//connect db
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './service/admin/admin.service';
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
    consumer.apply(AdminauthMiddleware).forRoutes('admin/');
  }
}
