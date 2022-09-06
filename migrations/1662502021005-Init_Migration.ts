import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1662502021005 implements MigrationInterface {
    name = 'InitMigration1662502021005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT 0, \`start_date\` datetime NOT NULL, \`potential_end_date\` datetime NOT NULL, \`status\` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_2117ba29bd245f2b53c42f429c\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects_users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_project_role\` enum ('owner', 'manager', 'developer', 'default') NOT NULL DEFAULT 'default', \`project_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_profiles\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`avatar\` varchar(255) NOT NULL, \`user_id\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD CONSTRAINT \`FK_b7d782db86a3dc1bd3b7eaed1fd\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD CONSTRAINT \`FK_274bd757ae91379bf033a2daccd\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_6ca9503d77ae39b4b5a6cc3ba88\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_6ca9503d77ae39b4b5a6cc3ba88\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP FOREIGN KEY \`FK_274bd757ae91379bf033a2daccd\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP FOREIGN KEY \`FK_b7d782db86a3dc1bd3b7eaed1fd\``);
        await queryRunner.query(`DROP INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` ON \`user_profiles\``);
        await queryRunner.query(`DROP TABLE \`user_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`projects_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_2117ba29bd245f2b53c42f429c\` ON \`projects\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
    }

}
