import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1662229145564 implements MigrationInterface {
    name = 'Init1662229145564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_profiles\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`avatar\` varchar(255) NOT NULL, \`userId\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_8481388d6325e752cd4d7e26c6\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_8481388d6325e752cd4d7e26c6d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_8481388d6325e752cd4d7e26c6d\``);
        await queryRunner.query(`DROP INDEX \`REL_8481388d6325e752cd4d7e26c6\` ON \`user_profiles\``);
        await queryRunner.query(`DROP TABLE \`user_profiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
