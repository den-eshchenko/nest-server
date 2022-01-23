import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtAtStrategy } from 'src/strategys/jwt-at-strategy';
import { JwtRtStrategy } from 'src/strategys/jwt-rt-strategy';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACSESS_KEY,
      // signOptions: { expiresIn: '48h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtAtStrategy, JwtRtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
