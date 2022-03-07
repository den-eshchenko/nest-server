import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

console.log('__dirname ', __dirname + '\\templates');

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`,
    ),
    MailerModule.forRoot({
      // transport: 'smtps://tt02710123@gmail.com:123456789rtk@smtp.gmail.com',
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        ignoreTLS: false,
        secure: false,
        // sendingRateTTL: 2,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
      // template: {
      //   dir: __dirname + '/templates',
      //   // adapter: new PugAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
  // controllers: [AppController],
})
export class AppModule {}
