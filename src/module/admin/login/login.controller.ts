import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';

@Controller('admin/login')
export class LoginController {
  constructor(private toolsService: ToolsService) {}

  @Get()
  @Render('admin/login')
  index() {
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
}
