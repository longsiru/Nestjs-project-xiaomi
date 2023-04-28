import { Controller, Get } from '@nestjs/common';

@Controller('')
export class IndexController {
  @Get()
  index() {
    return 'front fist page';
  }

  @Get('news')
  getNews() {
    return 'front news page';
  }
}
