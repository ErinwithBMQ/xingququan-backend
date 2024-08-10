import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';
import { User } from '../entity/user.entity';
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context;

  @Inject()
  jwtService: JwtService;

  @Inject()
  postService: PostService;

  @Post('/create_user')
  async create(@Body() user: User) {
    return await this.userService.createUser(user);
  }
  @Get('/find_user')
  async find(@Query('name') name: string) {
    const a = await this.userService.findUser(name);
    console.log('Found user in controller:', a);
    if (a === null) {
      return false;
    }
    return a.name;
  }

  @Post('/secret')
  async password(@Body() user: User) {
    const user2 = await this.userService.findUser(user.name);
    if (user2.secret === user.secret) {
      const token = await this.jwtService.sign({ username: user.name });
      return { token };
    }
    return false;
  }
  @Get('/get_name')
  async protectedRoute() {
    const token = this.ctx.request.header.authorization.split(' ')[1];
    try {
      this.ctx.state.user = await this.jwtService.verify(
        token,
        'YEONJUNBEOMGYU1399' // 确保这里使用的是正确的密钥
      );
      const username = this.ctx.state.user.username;
      return { username };
    } catch (error) {
      if (error) {
        this.ctx.status = 401;
        this.ctx.body = { error: 'Invalid token' };
      } else {
        this.ctx.status = 500;
        this.ctx.body = { error: 'Internal server error' };
      }
    }
  }

  @Get('/get_message')
  async get_message() {
    const token = this.ctx.request.header.authorization.split(' ')[1];
    try {
      this.ctx.state.user = await this.jwtService.verify(
        token,
        'YEONJUNBEOMGYU1399' // 确保这里使用的是正确的密钥
      );
      const username = this.ctx.state.user.username;
      const user = await this.userService.findUser(username);
      console.log(user);
      return { name: username, image_id: user.photo_id };
    } catch (error) {
      if (error) {
        this.ctx.status = 401;
        this.ctx.body = { error: 'Invalid token' };
      } else {
        this.ctx.status = 500;
        this.ctx.body = { error: 'Internal server error' };
      }
    }
  }

  @Get('/touxiang')
  async showTouxiang(@Query('name') name: string) {
    const a = await this.userService.findUser(name);
    console.log('Found user in controller:', a);
    if (a === null) {
      return false;
    }
    return a.photo_id;
  }

  @Get('/get_user_post')
  async get_user_post(@Query('name') name: string) {
    const a = await this.postService.getAllPostByPoster(name);
    console.log('Found user in controller:', a);
    return a;
  }

  @Get('/get_user_comment')
  async get_user_comment(@Query('name') name: string) {
    const a = await this.postService.getAllCommentByCreator(name);
    console.log('Found user in controller:', a);
    return a;
  }

  @Get('/get_user_likepost')
  async get_user_like(@Query('name') name: string) {
    return await this.postService.getAllLikePostByCreator(name);
  }

  @Get('/get_others_like')
  async get_others_like(@Query('name') name: string) {
    return await this.postService.getAllLikeByName(name);
  }

  @Get('/get_others_comment')
  async get_others_comment(@Query('name') name: string) {
    return await this.postService.getAllCommentByName(name);
  }

  @Post('/update_image')
  async update_image(@Body() body: { name: string; photo_id: number }) {
    const user = await this.userService.findUser(body.name);
    return await this.userService.updatePhoto_id(user.id, body.photo_id);
  }

  @Post('/update_secret')
  async update_secret(
    @Body() body: { name: string; old_secret: string; new_secret: string }
  ) {
    const user = await this.userService.findUser(body.name);
    if (user.secret !== body.old_secret) {
      return false;
    }
    return await this.userService.updateSecret(user.id, body.new_secret);
  }
}
