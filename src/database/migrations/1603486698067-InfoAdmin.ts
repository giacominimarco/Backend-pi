import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class InfoAdmin1603486698067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "infoAdmin",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "uuid",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "registration",
            type: "integer",
          },
          {
            name: "job",
            type: "varchar",
          },
          {
            name: "college",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "infoAdmin",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        name: "fk_info_admin",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
