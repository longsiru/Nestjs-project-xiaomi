import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('middleware');
    console.log(req.pasthname); //看看有没有答应出来路径
    //1.获取session里面保存的用户信息。
    //2.避免进入死循环，要在if文里面排除掉adminlogin画面。所以需要获取URL传过来的值。如果是login就不需要进行权限判断。
    // var userinfo = req.session.userinfo;
    // if (userinfo && userinfo.username) {
    //   next();
    // } else {
    //   req.redirect('/admin/login');
    // }
    next();
  }
}
