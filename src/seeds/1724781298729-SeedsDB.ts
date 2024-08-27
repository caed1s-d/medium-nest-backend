import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1724781298729 implements MigrationInterface {
  name = 'SeedDb1724781298729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "tags" (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    // password: pass123
    await queryRunner.query(
      `INSERT INTO "user" (username, email, password) VALUES ('caed1s', 'caed1s@example.com', '$2b$10$PVuzmCrUkLUBGJ/Y0CABvOGMf.W9i4KGK5uDzy3NEjfd6BFpflmh6')`,
    );

    await queryRunner.query(
      `INSERT INTO "articles" (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First article desc', 'First article body', 'coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO "articles" (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'Second article desc', 'Second article body', 'coffee,nestjs', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
