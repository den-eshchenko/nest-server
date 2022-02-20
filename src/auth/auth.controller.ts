import {
  Request,
  Post,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('pass'))
  @Post('autorization')
  async autorization(@Request() req) {
    console.log(req.body);
    return this.authService.autorization(req.body);
  }
  @Post('registration')
  async registration(@Request() req) {
    console.log(req.body);
    return this.authService.registration(req.body);
  }
  @Post('refresh')
  async refresh(@Request() req) {
    console.log(req.body);
    return this.authService.refresh(req.body.token);
  }
}
