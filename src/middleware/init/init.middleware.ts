import { Injectable, NestMiddleware } from '@nestjs/common';
//建立好了中间件要在跟模块进行配置。
//1.引入config
import { Config } from '../../config/config';
import { Helper } from '../../extend/helper';
@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.locals.config = Config;
    res.locals.helper = Helper; //这样就可以在模版里面使用help的实例了
    next();
  }
}
