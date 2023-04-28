import { Controller, Get } from '@nestjs/common';

@Controller('')
export class IndexController {
  @Get()
  index() {
    return 'front fist page';
  }
}
