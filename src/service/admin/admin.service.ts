import { Injectable } from '@nestjs/common';
//在service里面首先需要获取module
import { InjectModel } from '@nestjs/mongoose';
import { json } from 'stream/consumers';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private readonly adminModel) {}
  async find(json = {}) {
    return await this.adminModel.find(json);
  }
}
