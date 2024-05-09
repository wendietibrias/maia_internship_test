import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import IMailerObject from "./mailer.interface";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

@Injectable()
export class MailService{
    constructor(
        private readonly mailService: MailerService,
        private readonly configService: ConfigService
    ){}

    async sendMail(params: IMailerObject) {
        return await this.mailService.sendMail({
            from: this.configService.get<string>('mail.user'),
            to: params.to,
            subject: params.subject,
            template: join(__dirname,'templates/mail.ejs'),
            context:{
               link: params.link,
               name: params.name
            }
        })
    }
}