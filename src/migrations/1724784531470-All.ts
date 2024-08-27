import { MigrationInterface, QueryRunner } from "typeorm";

export class All1724784531470 implements MigrationInterface {
    name = 'All1724784531470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL DEFAULT '', "username" character varying NOT NULL DEFAULT '', "bio" character varying NOT NULL DEFAULT '', "image" character varying, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tagList" text NOT NULL, "favoritesCount" integer NOT NULL DEFAULT '0', "authorId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorites_articles" ("userId" integer NOT NULL, "articlesId" integer NOT NULL, CONSTRAINT "PK_2fa8a5bd94301a2985b59f5d397" PRIMARY KEY ("userId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_81b77658546f148f69db2e7a48" ON "user_favorites_articles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa78cf32d784957ec6ae8b1943" ON "user_favorites_articles" ("articlesId") `);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_favorites_articles" ADD CONSTRAINT "FK_81b77658546f148f69db2e7a487" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorites_articles" ADD CONSTRAINT "FK_aa78cf32d784957ec6ae8b19436" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites_articles" DROP CONSTRAINT "FK_aa78cf32d784957ec6ae8b19436"`);
        await queryRunner.query(`ALTER TABLE "user_favorites_articles" DROP CONSTRAINT "FK_81b77658546f148f69db2e7a487"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa78cf32d784957ec6ae8b1943"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_81b77658546f148f69db2e7a48"`);
        await queryRunner.query(`DROP TABLE "user_favorites_articles"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
