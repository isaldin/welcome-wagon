import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../entities/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'jwt' })
export class JwtEntity extends BaseEntity {
  @Column({ name: 'token' })
  token: string;

  @OneToOne(_type => UserEntity, { eager: true })
  @JoinColumn()
  user: UserEntity;
}
