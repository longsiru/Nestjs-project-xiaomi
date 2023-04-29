import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('middleware');
    //1.获取session里面保存的用户信息。
    var userinfo = req.session.userinfo;
    if (userinfo) {
      next();
    } else {
      req.redirect('/admin/login');
    }
  }
}
