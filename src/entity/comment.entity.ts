import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'creator',
    type: 'varchar',
    length: 255,
  })
  creator: string; //实际名字：类型

  @Column({
    name: 'message',
    type: 'varchar',
    length: 255,
  })
  message: string;

  @Column({
    name: 'post_id',
    type: 'int4',
  })
  post_id: number;

  @Column({
    name: 'time',
    type: 'date',
  })
  time: Date;
}
