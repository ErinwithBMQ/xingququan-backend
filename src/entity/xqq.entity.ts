import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('xqq')
export class Xqq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'xqq_name',
    type: 'text',
  })
  xqq_name: string; //实际名字：类型

  @Column({
    name: 'introduction',
    type: 'text',
  })
  introduction: string;

  @Column({
    name: 'creator',
    type: 'text',
  })
  creator: string;

  @Column({
    name: 'image_id',
    type: 'int4',
  })
  image_id: number;

  @Column({
    name: 'active_people',
    type: 'int',
  })
  active_people: number;

  @Column({
    name: 'post_number',
    type: 'int4',
  })
  post_number: number;
}
