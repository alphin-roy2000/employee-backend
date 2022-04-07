import {MigrationInterface, QueryRunner} from "typeorm";

export class address1649327508484 implements MigrationInterface {
    name = 'address1649327508484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
