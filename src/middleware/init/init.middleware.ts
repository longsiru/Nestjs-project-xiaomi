import { Injectable, NestMiddleware } from '@nestjs/common';
//建立好了中间件要在跟模块进行配置。
//1.引入config
import { Config } from '../../config/config';
@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.locals.config = Config;
    next();
  }
}
