import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user.entity';
import { Xqq } from '../entity/xqq.entity';
import { File_upload } from '../entity/file.entity';
import { PostEntity } from '../entity/post.entity';
import { Comment } from '../entity/comment.entity';
import { Like } from '../entity/like.entity';
import { uploadWhiteList } from '@midwayjs/upload';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721730969381_6818',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
    host: '0.0.0.0',
  },
  jwt: {
    secret: 'YEONJUNBEOMGYU1399', // 密钥
    expiresIn: '2h', // 过期时间
  },
  format: ['/file/show'],
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 100000 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        database: 'test', // 数据库名
        password: '123456', // 数据库密码
        synchronize: true,
        logging: true,
        entities: [User, Xqq, File_upload, PostEntity, Comment, Like],
      },
    },
  },
} as MidwayConfig;
