import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name', //在表单里显示的名字
    type: 'text',
  })
  name: string; //实际名字：类型

  @Column({
    type: 'text',
    name: 'secret',
  })
  secret: string;

  @Column({
    type: 'int4',
    name: 'photo_id',
  })
  photo_id: number;
}
