import {
  Controller,
  Inject,
  Post,
  Files,
  Get,
  Query,
  Fields,
} from '@midwayjs/core';
import { File_upload } from '../entity/file.entity';
import { FileService } from '../service/file.service';
import { createReadStream } from 'fs';
import { resolve } from 'path';

@Controller('/file')
export class HomeController {
  @Inject()
  ctx;

  @Inject()
  fileService: FileService;

  @Post('/upload')
  async upload(@Files() files, @Fields() fields) {
    let id = 1399;
    for (const file of files)
      id = await this.fileService.addFile(file as File_upload);

    return id;
  }

  @Get('/show')
  async show(@Query('id') id: number) {
    const file = await this.fileService.getFile(id);
    if (file.data) {
      this.ctx.type = file.mimeType;
      this.ctx.body = createReadStream(resolve(file.data));
    }
    this.ctx.status = 200;
  }
}
