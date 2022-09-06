import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();
import { config } from 'dotenv';
import {UserProfileEntity} from "../src/entities/user-profile.entity";
import {UserEntity} from "../src/entities/user.entity";
import {ProjectEntity} from "../src/entities/project.entity";
import {ProjectUserEntity} from "../src/entities/project-user.entity";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {InitMigration1662502021005} from "../migrations/1662502021005-Init_Migration";

config();

export default new DataSource({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    subscribers: [],
    logging: true,
    entities: [UserEntity, UserProfileEntity, ProjectEntity, ProjectUserEntity],
    migrations: [InitMigration1662502021005]
});
