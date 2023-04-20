import { Injectable } from '@nestjs/common';
//引入验证码库
import * as svgCaptcha from 'svg-captcha';
//var svgCaptcha = require('svg-captcha');

@Injectable()
export class ToolsService {
  //生成验证码
  async getCaptcha() {
    var captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    return captcha;
  }
}
