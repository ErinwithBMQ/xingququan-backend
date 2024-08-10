import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { File_upload } from '../entity/file.entity';
import { Repository } from 'typeorm';

@Provide()
export class FileService {
  @InjectEntityModel(File_upload)
  fileModel: Repository<File_upload>;
  async addFile(fileUpload: File_upload) {
    await this.fileModel.save(fileUpload);
    console.log(fileUpload);
    return fileUpload.id;
  }
  async getFile(id: number) {
    return this.fileModel.findOneBy({ id });
  }
}
