import { v4 as uuid4 } from 'uuid';

import { AccountStatus } from 'src/common/enum/account.status.enum';
import { BeforeInsert } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base_entity.dto';

@Entity()
export class User extends BaseEntity {
  @Column()
  nickname: string;

  @Column()
  password: string;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @PrimaryGeneratedColumn('uuid')
  accessToken: string;

  @Column({ nullable: true })
  serverId: string;

  @Column({
    nullable: true,
  })
  skinUrl: string;

  @Column({ default: AccountStatus.ENABLED })
  status: AccountStatus;

  token: string;
}
