import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { BaseEntity } from '../entities/base.entity';
import { RoleEntity } from '../entities/role.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @ManyToOne(
    _type => RoleEntity,
    role => role.users,
  )
  role: RoleEntity;
}
