import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RequestHours1605845900229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(new Table({
        name: 'requestsHours',
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: 'user_id',
            type: 'uuid',
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
           name: 'solicitation_id',
           type: 'uuid',
          },
          {
            name: 'file_id',
            type: 'uuid',
          },
          {
            name: 'hour',
            type: 'timestamp',
          },
          {
            name: 'calculated_hours',
            type: 'timestamp',
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: 'fk_user',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
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
            name: 'fk_solicitation',
            columnNames: ['solicitation_id'],
            referencedTableName: 'solicitations',
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
        ]
      }))


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("requestsHours");
    }

}
