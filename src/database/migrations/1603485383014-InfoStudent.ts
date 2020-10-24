import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class InfoStudent1603485383014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "infoStudent",
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
            name: "course",
            type: "varchar",
          },
          {
            name: "team",
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
      "infoStudent",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        name: "fk_info_student",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      })
    );
  }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
