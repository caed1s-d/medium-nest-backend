import { MigrationInterface, QueryRunner } from "typeorm";

export class User1723570837398 implements MigrationInterface {
    name = 'User1723570837398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL DEFAULT '', "username" character varying NOT NULL DEFAULT '', "bio" character varying NOT NULL DEFAULT '', "image" character varying, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
