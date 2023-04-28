import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
//配置loginauth的中间件,访问admin下面的页面都要在这个中间件进行权限判断
import { AdminauthMiddleware } from './middleware/adminauth/adminauth.middleware';
@Module({
  imports: [AdminModule, DefaultModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminauthMiddleware).forRoutes('admin/');
  }
}
