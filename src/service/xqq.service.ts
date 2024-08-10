import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Xqq } from '../entity/xqq.entity';

@Provide()
export class XqqService {
  @InjectEntityModel(Xqq)
  xqqModel: Repository<Xqq>;

  async createXqq(xqq: Xqq) {
    // 将实体保存到数据库
    try {
      return await this.xqqModel.save(xqq); // 返回保存后的实体
    } catch (error) {
      // 处理保存过程中可能出现的错误
      throw new Error(`Failed to save Xqq: ${error.message}`);
    }
  }

  async getAllXqqs(): Promise<Xqq[]> {
    return await this.xqqModel.find();
  }

  async getXqqById(id: number): Promise<Xqq | undefined> {
    return await this.xqqModel.findOne({ where: { id } });
  }
}
