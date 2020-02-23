import {MigrationInterface, QueryRunner} from "typeorm";

export class SurveyManagerFieldFix1580822443903 implements MigrationInterface {
    name = 'SurveyManagerFieldFix1580822443903'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "manager"`, undefined);
        await queryRunner.query(`ALTER TABLE "survey" ADD "manager" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "manager"`, undefined);
        await queryRunner.query(`ALTER TABLE "survey" ADD "manager" integer`, undefined);
    }

}
