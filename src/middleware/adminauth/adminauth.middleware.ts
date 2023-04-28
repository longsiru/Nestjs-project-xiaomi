import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('middleware');
    next();
  }
}
