import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base_entity.dto';

@Entity()
export class User extends BaseEntity {
  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  uuid: boolean;

  @Column()
  accessToken: string;
}
