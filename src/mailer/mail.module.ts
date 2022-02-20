import * as path from 'path';
import { Module } from '@nestjs/common';
import { MyMailService } from './mail.service';

@Module({
  providers: [MyMailService],
  exports: [MyMailService],
})

export class MyMailModule {}