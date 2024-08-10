import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('like')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'creator',
    type: 'varchar',
    length: 255,
  })
  creator: string;

  @Column({
    name: 'post_id',
    type: 'int4',
  })
  post_id: number;
}
