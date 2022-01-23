import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
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

  async login(user: any) {
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

  async refresh(token: string) {
    try {
      const jwtPayload = await this.jwtService.verifyAsync(token, {
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
