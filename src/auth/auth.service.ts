import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registration, RegistrationDocument } from './schemas/registration.schema';
import { MyMailService } from 'src/mailer/mail.service';
import { User, UserRegistration } from './types';

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

  async autorization(user: User) {
    const jwtPayload = { username: user.username };
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

  async registration(user: UserRegistration) {
    const responseMail = await this.mailService.confirmRegistration(user);
    
    try {
      const newUser = new this.RegistrationModel(user);
      await newUser.save();
      return new HttpException(responseMail, HttpStatus.CREATED);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  async refresh(refresh_token: string) {
    try {
      const jwtPayload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.JWT_REFRESH_KEY
      });
      return {
        access_token: this.jwtService.sign(jwtPayload),
      }
    }
    catch (e) {
      throw new UnauthorizedException();
    }
  }
}
