import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Solicitation1605844524155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(new Table({
        name: 'solicitations',
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            isNullable: false
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: 'student_id',
            type: 'uuid'
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: 'fk_user_id',
            columnNames: ['student_id'],
            referencedTableName: 'infoStudent',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("solicitations");
    }

}
