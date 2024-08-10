import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class File_upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'filename',
    type: 'varchar',
    length: 255,
  })
  filename: string; //实际名字：类型

  @Column({
    name: 'data',
    type: 'varchar',
    length: 255,
  })
  data: string;

  @Column({
    name: 'fieldName',
    type: 'varchar',
    length: 32,
  })
  fieldName: string;

  @Column({
    name: 'mimeType',
    type: 'varchar',
    length: 64,
  })
  mimeType: string;
}
