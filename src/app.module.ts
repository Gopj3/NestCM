import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from '@nestjs/config';
import {DataSource} from "typeorm";
import {AutomapperModule} from "@automapper/nestjs";
import {classes} from "@automapper/classes";
import {AuthModule} from "./modules/auth/auth.module";
import {UserModule} from "./modules/user/user.module";
import {UserRepository} from "./modules/user/user.repository";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                synchronize: true,
                subscribers: [],
                logging: true,
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                migrations: [__dirname + 'migrations/*.ts'],
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [
        AppService
    ],
    exports: [ConfigModule]
})

export class AppModule {
}
