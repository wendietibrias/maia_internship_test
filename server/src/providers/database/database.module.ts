import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            inject:[ConfigService],
            useFactory: (configService: ConfigService) => ({
                type:'mysql',
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>("database.dbName"),
                entities:[UserEntity],
                synchronize:true,
                retryAttempts:3
            })
        })
    ],
    providers:[],
    exports:[]
})
export class DatabaseModule{}