import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base_entity.dto';

@Entity()
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;
}
