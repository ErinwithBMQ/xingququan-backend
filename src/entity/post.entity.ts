import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'poster_name',
    type: 'varchar',
    length: 255,
  })
  poster_name: string; //实际名字：类型

  @Column({
    name: 'message',
    type: 'varchar',
    length: 255,
  })
  message: string;

  @Column({
    name: 'xqq_id',
    type: 'int4',
  })
  xqq_id: number;

  @Column({
    name: 'image_id',
    type: 'int4',
  })
  image_id: number;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'time',
    type: 'date',
  })
  time: Date;

  @Column({
    name: 'like_number',
    type: 'int4',
  })
  like_number: number;

  @Column({
    name: 'comment_number',
    type: 'int4',
  })
  comment_number: number;
}
