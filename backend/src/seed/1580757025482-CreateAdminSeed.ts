import { MigrationInterface, QueryRunner } from 'typeorm';

import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../user/user.entity';

export class CreateAdminSeed1580747025482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const roleRepository = queryRunner.connection.getRepository(RoleEntity);
    const adminRole = await roleRepository.findOne({ name: 'admin' });
    const user = new UserEntity();
    user.email = 'root@root.root';
    user.password = 'test';
    user.role = adminRole;
    await queryRunner.connection.getRepository(UserEntity).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
