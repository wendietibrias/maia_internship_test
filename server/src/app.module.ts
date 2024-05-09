import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './providers/database/database.module';
import { AuthModule } from './modules';
import { JWTModule } from './providers/jwt/jwt.module';
import { MailModule } from './providers/mailer/mailer.module';
import configs from './common/configs';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load: configs
    }),
    JWTModule,
    DatabaseModule,
    MailModule,
    AuthModule,
    EmailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
