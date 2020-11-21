import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserHour1605985859068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(new Table({
        name: 'user_hours',
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: 'student_id',
            type: 'uuid',
          },
          {
            name: 'hour',
            type: 'integer',
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: 'fk_student',
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
      await queryRunner.dropTable('user_hours');
    }

}
