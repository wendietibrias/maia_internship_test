import { Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from "@nestjs/config";
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailService } from "./mailer.service";
import { join } from 'path';

@Module({
    imports:[
        MailerModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                transport:{
                    host: configService.get<string>('mail.host'),
                    port: configService.get<number>('mail.port'),
                    auth: {
                        user: configService.get<string>('mail.user'),
                        pass: configService.get<string>('mail.password')
                    }
                },
                template:{
                    adapter: new EjsAdapter({
                        inlineCssEnabled:true
                    })
                }
            }),
            inject:[ConfigService]
        }),
    ],
    controllers:[],
    providers:[MailService]
})
export class MailModule {}