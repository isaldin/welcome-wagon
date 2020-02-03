import { hash as bcryptHash } from 'bcrypt';
import { BeforeInsert, Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { BaseEntity } from '../entities/base.entity';
import { RoleEntity } from '../entities/role.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptHash(this.password, 10);
  }

  @ManyToOne(
    _type => RoleEntity,
    role => role.users,
  )
  role: RoleEntity;

  @RelationId((user: UserEntity) => user.role)
  roleId: number;
}
