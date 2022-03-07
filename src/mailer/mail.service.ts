import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MyMailService {
  constructor(private readonly mailerService: MailerService) {}

  public example() {
    this.mailerService
      .sendMail({
        to: 'den.eschenko@gmail.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        // html: '',
        template: join(__dirname, 'templates', 'confirmReg'),
      })
      .then((e) => { console.log(e) })
      .catch((err) => { console.log(err) });
  }
}
