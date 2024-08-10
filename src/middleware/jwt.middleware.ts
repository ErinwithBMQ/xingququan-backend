import { httpError, Inject, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        console.log('不包含authorization字段');
        throw new httpError.BadRequestError();
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        console.log('数组长度不是为2');
        throw new httpError.BadRequestError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          await this.jwtService.verify(token, {
            complete: true,
          });
          console.log('scheme是bearer，token校验成功');
        } catch (error) {
          console.log('scheme是bearer，但是token校验失败');
          throw new httpError.UnauthorizedError();
        }
        await next();
      } else {
        console.log('scheme不是bearer');
        throw new httpError.ForbiddenError();
      }
    };
  }
  ignore(ctx: Context): boolean {
    const ignorePathList = [
      '/user/create_user',
      '/user/find_user',
      '/user/secret',
      '/file/upload',
      '/file/show',
      '/upload',
    ];
    return ignorePathList.includes(ctx.path);
  }
}
