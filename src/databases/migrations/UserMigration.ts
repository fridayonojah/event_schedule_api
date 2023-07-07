import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class UserMigration1687376617472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        width: 11,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                    },
                    {name: 'name', type: 'varchar', length: '255', isNullable: true},
                    {name: 'email', type: 'varchar', length: '255', isNullable: false},
                    {name: 'password', type: 'varchar', length: '255', isNullable: false},
                    {name: 'created_at', type: 'datetime', isNullable: true},
                    {name: 'updated_at', type: 'datetime', isNullable: true},
                ]
            }),
            true,
            false,
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
