import { MigrationInterface, QueryRunner } from 'typeorm';

import { RoleEntity } from '../entities/role.entity';

export class RolesSeed1580746417834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.connection
      .getRepository(RoleEntity)
      .save([{ name: 'admin' }, { name: 'manager' }]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
