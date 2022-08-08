import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  @Get('get')
  getFile(@Res() res) {
    const file = createReadStream(join(process.cwd(), 'audio.mp3'));
    file.pipe(res);
    // return new StreamableFile(file);
  }
}