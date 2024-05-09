import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "src/providers/mailer/mailer.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers:[AuthController],
    providers:[
        AuthService,
        JwtService,
        MailService
    ],
})

export class AuthModule {}