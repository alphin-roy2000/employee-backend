import {MigrationInterface, QueryRunner} from "typeorm";

export class rolesTable1649311142859 implements MigrationInterface {
    name = 'rolesTable1649311142859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ADD "employee_id" uuid`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_2fc517e6905bf74c28f1be7f333" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_2fc517e6905bf74c28f1be7f333"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "employee_id"`);
    }

}
