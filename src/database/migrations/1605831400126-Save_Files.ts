import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class SaveFiles1605831400126 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(new Table({
        name: 'upload_files',
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: 'path',
            type: 'varchar',
          },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('upload_files');
    }

}
