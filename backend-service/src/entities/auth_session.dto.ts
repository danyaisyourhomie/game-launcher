import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base_entity.dto';

@Entity()
export class AuthSession extends BaseEntity {
  @Column()
  nickname: string;
}
