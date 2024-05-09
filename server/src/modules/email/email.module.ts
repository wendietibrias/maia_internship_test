import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "src/providers/mailer/mailer.service";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[EmailController],
    providers:[
        EmailService,
        JwtService,
        MailService
    ]
})

export class EmailModule {}