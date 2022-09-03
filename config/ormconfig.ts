import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();
import { config } from 'dotenv';
import {UserProfile} from "../src/entities/UserProfile";
import {User} from "../src/entities/User";
import {Init1662226829076} from "../migrations/1662226829076-Init";

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
    entities: [
        User,
        UserProfile
    ],
    migrations: [
        Init1662226829076
    ]
});
