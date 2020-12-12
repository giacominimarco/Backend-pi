import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1596555350634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "last_name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            },
          {
            name: "phone",
            type: "numeric",
          },
          {
            name: "born_date",
            type: "date",
          },
          {
            name: "cpf",
            type: "numeric",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "isValidate",
            type: "boolean"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },

        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
