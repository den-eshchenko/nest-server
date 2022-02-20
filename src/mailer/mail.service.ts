import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

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
        html: '<b>welcome</b>', // HTML body content

      })
      .then((e) => { console.log(e) })
      .catch((err) => { console.log(err) });
  }
}
