import { MigrationInterface, QueryRunner } from 'typeorm';

export class JwtEntity1580759855422 implements MigrationInterface {
  name = 'JwtEntity1580759855422';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "jwt" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "token" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_690dc6b83bb053b2ccd4342a17" UNIQUE ("userId"), CONSTRAINT "PK_5d23295f3f8f90b85e63e8040fd" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "jwt" ADD CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "jwt" DROP CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "jwt"`, undefined);
  }
}
