import {
  Post,
  UseGuards,
  Controller,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RefreshToken, User, UserRegistration } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('pass'))
  @Post('autorization')
  async autorization(@Body() body: User) {
    console.log('autorizationReq ', body);
    return this.authService.autorization(body);
  }
  @Post('registration')
  async registration(@Body() body: UserRegistration) {
    console.log('registrationReq ', body);
    return this.authService.registration(body);
  }
  @Post('refresh-accessToken')
  async refresh(@Body() body: RefreshToken) {
    console.log('refresh-accessTokenReq ', body);
    return this.authService.refresh(body.refresh_token);
  }
}
