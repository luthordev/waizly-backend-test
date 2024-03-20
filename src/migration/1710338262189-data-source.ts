import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateSchema1678681500130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "username",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "role",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "content",
            type: "text",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "created_by_id",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FK_posts_created_by_users",
            columnNames: ["created_by_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "comments",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "comment",
            type: "text",
            isNullable: false,
          },
          {
            name: "post_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "created_by_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            name: "FK_comments_post_posts",
            columnNames: ["post_id"],
            referencedTableName: "posts",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "FK_comments_created_by_users",
            columnNames: ["created_by_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("comments");
    await queryRunner.dropTable("posts");
    await queryRunner.dropTable("users");
  }
}
