import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ResendVerificationEmail, VerifyEmailDTO } from './email.dto';
import catchErrorMessageHandler from 'src/common/helpers/CatchErrorMessage.helper';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/providers/mailer/mailer.service';
import { Response } from 'express';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly mail: MailService,
  ) {}

  async resendVerification(body: ResendVerificationEmail) {
    try {
      const { email } = body;

      //check if user gmail is valid
      const findUser = await this.user.findOneBy({ email });
      if (!findUser) {
        throw new NotFoundException('Account not found');
      }

      const verificationToken = await this.jwt.signAsync(
        { name: findUser.name, email: findUser.email },
        { secret: this.configService.get<string>('jwt.secret'),expiresIn:"3m" },
      );

      await this.user.update(
        { email },
        { verification_token: verificationToken },
      );

      const sendMail = await this.mail.sendMail({
        link: `${this.configService.get<string>('app.verificationUrl')}?key=${verificationToken}`,
        name: findUser.name,
        subject: 'Verify Your Email Address To Complete Registration',
        to: findUser.email,
      });

      if (sendMail) {
        return {
          message: 'successfully send resend request',
          status: 'success',
        };
      }
    } catch (err) {
      catchErrorMessageHandler(err);
    }
  }

  async verifyEmail(query: VerifyEmailDTO,res: Response) {
    try {
      const { key } = query;

      //decode the token
      const { email,exp } = await this.jwt.verifyAsync(key, {
        secret: this.configService.get<string>('jwt.secret'),
      });

      //check token expiration
      if (exp < (new Date().getTime() + 1) / 1000) {
         throw new ForbiddenException("Expired verification link, please resend it!");
      }

      //check if the token info is valid
      const findUser = await this.user.findOneBy({ email });
      if (!findUser) {
        throw new NotAcceptableException('Invalid credentials');
      }

      //check if the user already verified
      if(findUser.is_verified) {
         throw new ForbiddenException("Account already active");
      }

      //check if the token match with jwt token in users
      if (findUser.verification_token !== key) {
        throw new NotAcceptableException('Invalid credentials');
      }

      const updateUserVerified = await this.user.update(
        { email },
        { verification_token: null, is_verified: true },
      );

      if (updateUserVerified) {
         return res.redirect(this.configService.get<string>('app.redirectUrl'));
      }
    } catch (err) {
      catchErrorMessageHandler(err);
    }
  }
}
