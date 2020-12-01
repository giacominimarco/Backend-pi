import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class logsRequestHours1606784479387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(new Table({
        name: 'logsRequestHours',
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: 'type_hour_id',
            type: 'uuid',
          },
          {
            name: 'state_id',
            type: 'uuid',
          },
          {
            name: 'file_id',
            type: 'uuid',
          },
          {
            name: "solicitation_id",
            type: "uuid"
          },
          {
            name: "updatedBy_user_id",
            type: "uuid"
          },
          {
            name: 'hour',
            type: 'integer',
          },
          {
            name: 'calculated_hours',
            type: 'integer',
          },
          {
            name: "comments",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: 'fk_type_hour',
            columnNames: ['type_hour_id'],
            referencedTableName: 'type_hours',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_state',
            columnNames: ['state_id'],
            referencedTableName: 'states',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_file',
            columnNames: ['file_id'],
            referencedTableName: 'upload_files',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_solicitation',
            columnNames: ['solicitation_id'],
            referencedTableName: 'solicitations',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_updatedByUser',
            columnNames: ['updatedBy_user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ]
      }))


    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('logsRequestHours');
    }

}
