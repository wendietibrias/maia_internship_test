import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[
        JwtModule.registerAsync({
            inject:[ConfigService],
            useFactory: (configService: ConfigService)=>({
                global: configService.get<boolean>('jwt.global'),
                secret: configService.get<string>('jwt.secret'),
                signOptions:{
                    expiresIn: configService.get<string>('jwt.expires')
                }
            })
        })
    ],
    controllers:[],
    providers:[]
})
export class JWTModule{}