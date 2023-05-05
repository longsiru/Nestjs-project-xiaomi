import { Config } from './../../../config/config';
import { Controller, Get, Render } from '@nestjs/common';

@Controller(`${Config.adminPath}admin/main`)
export class MainController {
  @Get()
  @Render('admin/main/index')
  index() {
    return {};
  }

  @Get('welcome')
  @Render('admin/main/welcome')
  welcome() {
    return {};
  }
}
