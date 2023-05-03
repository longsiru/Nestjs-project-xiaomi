import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Request,
  Response,
} from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
import { AdminService } from '../../../service/admin/admin.service';

@Controller('admin/login')
export class LoginController {
  //获取service的实例
  //这样既可以操作admin表了
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
  ) {}

  @Get()
  @Render('admin/login')
  async index() {
    //console.log(await this.adminService.findAll());
    return {}; //返回对象。
  }

  @Get('code')
  async getCode(@Request() req, @Response() res) {
    var svgCaptcha = await this.toolsService.getCaptcha();
    //设置session，需要在方法里面引入，request,为了把验证码保存起来。
    req.session.code = svgCaptcha.text;
    //指定返回的类型
    res.type('image/svg+xml');

    //给页面返回一张图片
    res.send(svgCaptcha.data);
  }

  @Post('doLogin')
  //用bogy获取login ejs 传输过来的数据。
  async doLogin(@Body() body, @Request() req, @Response() res) {
    try {
      var code: string = body.code;
      var username: string = body.username;
      var password: string = body.password;
      if (username == '' || password.length < 6) {
        // console.log('username or password is wrong');
        // res.redirect('/admin/main');
        this.toolsService.error(
          res,
          'username or password is wrong',
          '/admin/login',
        );
        // await res.render('admin/public/error', {
        //   message: 'username or password is wrong',
        //   redirect: '/admin/login',
        // }); 封装在tools service里面
      } else {
        console.log(req.session.code, code);
        if (code.toUpperCase() == req.session.code.toUpperCase()) {
          password = this.toolsService.getMd5(password); //加密密码
          var userResult = await this.adminService.find({
            username: username,
            password: password,
          });
          if (userResult.length > 0) {
            console.log('successfully');
            req.session.userinfo = userResult[0];
            //res.redirect('/admin/main');
            this.toolsService.success(res, '/admin/main');
          } else {
            this.toolsService.error(
              res,
              'username or password is wrong',
              '/admin/login',
            );
            // await res.render('admin/public/error', {
            //   message: 'username or password is wrong',
            //   redirectUrl: '/admin/login',
            // });
          }
        } else {
          // console.log(' code is wrong');
          // res.redirect('/admin/login');

          // await res.render('admin/public/error', {
          //   message: 'code is wrong',
          //   redirectUrl: '/admin/login',
          // });

          this.toolsService.error(res, 'code is wrong', '/admin/login');
        }
      }
    } catch (error) {
      console.log(error);
      res.redirect('/admin/login');
    }
  }

  /*
   
     注意：1、需要在前端页面用js验证用户输入的信息是否正确     2、后台获取数据以后判断数据格式是否正确



     1、获取表单提交的数据 

     2、判断验证码是否正确

     验证码正确

         1、要对表单里面的密码进行md5加密               md5模块  https://www.npmjs.com/package/md5

                                                           1、安装 cnpm install md5 --save

                                                           2、引入 md5 var md5 = require('md5');

                                                           3、使用  md5(str)


         2、在用户表（集合）中查询当前用户是否存在              （mongoose操作mongodb数据库）https://docs.nestjs.com/techniques/mongodb

                                                                 1、配置mongoose

                                                                 2、创建操作数据库的model


         3、如果数据库有此用户（登录成功） ：保存用户信息     跳转到后台管理系统

         4、如果数据库有此用户（登录失败）： 跳转到登录页面


      验证码错误： 跳转到登录页面   提示验证码不正确


     */
}
