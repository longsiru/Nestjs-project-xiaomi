import { Injectable } from '@nestjs/common';
//在service里面首先需要获取module
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private readonly adminModel) {}
  async findAll() {
    return await this.adminModel.find().exec();
  }
}
