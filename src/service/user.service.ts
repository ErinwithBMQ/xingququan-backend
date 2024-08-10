import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async findUser(name: string) {
    const user = await this.userModel.findOne({
      where: {
        name,
      },
    });
    console.log('name:', name);
    console.log('Found user in service:', user);
    return user;
  }
  async createUser(user: User) {
    return this.userModel.save(user); //上传user数据
  }

  async updatePhoto_id(id: number, updatedImage_id: number): Promise<number> {
    const result = await this.userModel
      .createQueryBuilder('user')
      .update()
      .set({ photo_id: updatedImage_id })
      .where('id = :id', { id })
      .execute();
    return result.affected; // 返回受影响的行数
  }

  async updateSecret(id: number, new_secret: string) {
    const result = await this.userModel
      .createQueryBuilder('user')
      .update()
      .set({ secret: new_secret })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }
}
