import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registration, RegistrationDocument } from './schemas/registration.schema';
import { MyMailService } from 'src/mailer/mail.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Registration.name) private RegistrationModel: Model<RegistrationDocument>,
    private mailService: MyMailService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async autorization(user: any) {
    const jwtPayload = { username: user.username, sub: user.userId };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_ACSESS_KEY,
        expiresIn: '1m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_KEY,
        expiresIn: '2m',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async registration(user: any) {
    this.mailService.example();
    try {
      const newUser = new this.RegistrationModel(user);
      await newUser.save();
      return new HttpException('Registration complete!', HttpStatus.CREATED) 
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async refresh(token: string) {
    console.log(token);
    try {
      const jwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_KEY
      });
      return {
        access_token: this.jwtService.sign(jwtPayload),
      }
    }
    catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
