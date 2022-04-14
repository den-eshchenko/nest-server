import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Registration, RegistrationSchema } from './schemas/registration.schema';
import { JwtStrategy } from './strategys/jwt.strategy';
import { MyMailModule } from 'src/mailer/mail.module';
import { JwtRtStrategy } from './strategys/jwt-rt.strategy';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    MyMailModule,
    JwtModule.register({
      secret: process.env.JWT_ACSESS_KEY,
    }),
    MongooseModule.forFeature([{ name: Registration.name, schema: RegistrationSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
