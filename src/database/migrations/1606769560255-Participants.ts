import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Participants1606769560255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "internal_participants",
        columns: [
          { name: "internalEvent_id", type: "uuid" },
          { name: "student_id", type: "uuid" },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "internal_participants",
      new TableForeignKey({
        columnNames: ["internalEvent_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "internalEvent",
        name: "fk_internal_user",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "internal_participants",
      new TableForeignKey({
        columnNames: ["student_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "infoStudent",
        name: "fk_student_internal",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('participants');
    }

}
