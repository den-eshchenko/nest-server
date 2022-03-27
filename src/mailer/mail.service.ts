import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { UserRegistration } from 'src/auth/types';

@Injectable()
export class MyMailService {
  constructor(private readonly mailerService: MailerService) {}

  public example(user: UserRegistration) {
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'noreply@nestjs.com',
        subject: 'testing nestJS, MailerModule ✔',
        text: 'Welcome!',
        template: join(__dirname, '/templates', 'confirmReg'),
        context: {
          username: user.username,
        },
      })
      .then((e) => { console.log(e) })
      .catch((e) => {
        console.log(e);
        // throw new HttpException(
        //   `Ошибка работы почты: ${JSON.stringify(e)}`,
        //   HttpStatus.UNPROCESSABLE_ENTITY,
        // );
      });

  }
}
