import { AccountStatus } from 'src/common/enum/account.status.enum';
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
  uuid: boolean;

  @PrimaryGeneratedColumn('uuid')
  accessToken: string;

  @Column({
    nullable: true,
  })
  skinUrl: string;

  @Column({ default: AccountStatus.ENABLED })
  status: AccountStatus;
}
