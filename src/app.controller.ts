import {
  Request,
  Get,
  Post,
  UseGuards,
  Controller,
  Response,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req);
    // res
    //   .cookie('access_token', this.authService.login(req.user), {
    //     httpOnly: true,
    //     domain: 'localhost', // your domain here!
    //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //   })
    //   .send({ success: true });
    // console.log(req);
    return this.authService.login(req.user);
  }
  @Post('test')
  async getToken(@Request() req) {
    // console.log(req.body.token);
    return this.authService.refresh(req.body.token);
  }
}
