import { Column, Entity, OneToMany } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    _type => UserEntity,
    user => user.role,
    { cascade: true },
  )
  users: UserEntity[];
}
