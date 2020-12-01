import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class InternalEvent1606517937938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(new Table({
        name: 'internalEvent',
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "eventName",
            type: "varchar"
          },
          {
            name: "description",
            type: "varchar"
          },
          {
            name: "eventDate",
            type: "date",
          },
          {
            name: "activeEvent",
            type: "boolean"
          },
          {
            name: "howManyHours",
            type: "integer"
          },
          {
            name: "key",
            type: "varchar"
          },
        ],
      })

      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('internalEvent');
    }

}
