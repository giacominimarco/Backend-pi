import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class EspecifyTypeHour1606152011518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(new Table({
        name: 'especify_type_hours',
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
            name: 'activity',
            type: 'varchar',
          },
          {
            name: 'workload_equivalent',
            type: 'integer',
          },
          {
            name: 'documentation_required',
            type: 'varchar',
          },
          {
            name: 'comments',
            type: 'varchar',
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
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("especify_type_hours");
    }

}
