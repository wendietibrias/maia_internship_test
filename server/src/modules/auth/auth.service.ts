import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './auth.dto';
import catchErrorMessageHandler from 'src/common/helpers/CatchErrorMessage.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/providers/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
    private readonly configService: ConfigService,
  ) {}

  async findUserByEmail(email: string) {
    return await this.user.findOneBy({ email });
  }

  async login(body: LoginDTO) {
    try {
      const { email, password } = body;

      //check if user exist or not
      const findUser = await this.findUserByEmail(email);
      if (!findUser) {
        throw new NotFoundException('Invalid user account not found');
      }

      //check if user account already active or not
      if (!findUser.is_verified) {
        throw new NotAcceptableException('Please,verify your account first');
      }

      //check if the password match
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (!comparePassword) {
        throw new BadRequestException('Invalid email or password');
      }

      const generateToken = await this.jwt.signAsync(
        { email: findUser.email, name: findUser.name },
        { secret: this.configService.get<string>('jwt.secret') },
      );

      return {
        message: 'successfully login to your account',
        data: {
          access_token: generateToken,
        },
        status: 'success',
      };
    } catch (err) {
      catchErrorMessageHandler(err);
    }
  }

  async register(body: RegisterDTO) {
    try {
      const { name, email, password } = body;

      //check if user already exist and throw error
      const findUser = await this.findUserByEmail(email);
      if (findUser) {
        throw new BadRequestException('Account already exist');
      }

      const salt = 10;
      const saltRounds = await bcrypt.genSalt(salt);

      const hashPassword = await bcrypt.hash(password, saltRounds);

      const createUser = await this.user.save({
        name,
        email,
        password: hashPassword,
        is_verified: false,
      });

      if (createUser) {
        const verificationToken = await this.jwt.signAsync(
          { name: createUser.name, email: createUser.email },
          { secret: this.configService.get<string>('jwt.secret'),expiresIn:"3m"  },
        );

        await this.mail.sendMail({
          to: createUser.email,
          subject: 'Verify Your Email Address to Complete Registration',
          link: `${this.configService.get<string>('app.verificationUrl')}?key=${verificationToken}`,
          name: createUser.name,
        });

        await this.user.update(
          { email: createUser.email },
          { verification_token: verificationToken },
        );

        return {
          message: 'Check your gmail to complete registration process',
          status: 'success',
          data: {
             key: verificationToken
          }
        };
      }
    } catch (err) {
      catchErrorMessageHandler(err);
    }
  }
}
