import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();
import { config } from 'dotenv';
import {UserProfileEntity} from "../src/entities/user-profile.entity";
import {UserEntity} from "../src/entities/user.entity";
import {Init1662229145564} from "../migrations/1662229145564-Init";

config();

export default new DataSource({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    synchronize: true,
    subscribers: [],
    logging: true,
    entities: [UserEntity, UserProfileEntity],
    migrations: [Init1662229145564]
});
