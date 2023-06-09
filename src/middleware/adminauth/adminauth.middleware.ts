import { Injectable, NestMiddleware } from '@nestjs/common';
//这里面也有url的设置所以也引入config
import { Config } from '../../config/config';
@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    //console.log('middleware');
    // console.log(req.originalUrl); //看看有没有打印出来路径，baseUrl: '/admin',originalUrl
    var pathname = req.originalUrl;
    //1.获取session里面保存的用户信息。
    //2.避免进入死循环，要在if文里面排除掉adminlogin画面。所以需要获取URL传过来的值。如果是login就不需要进行权限判断。
    //3.拿到路径之后要进行排除。if if p0-
    var userinfo = req.session.userinfo;
    if (userinfo && userinfo.username) {
      //设置全局变量。登录成功进行设置。
      res.locals.userinfo = userinfo;
      next();
    } else {
      //排除不需要做权限判断的页面。
      if (
        pathname == `/${Config.adminPath}/login` ||
        pathname == `/${Config.adminPath}/login/code` ||
        pathname == `/${Config.adminPath}/login/doLogin`
      ) {
        next();
      } else {
        res.redirect(`/${Config.adminPath}/login`);
      }
    }
  }
}
