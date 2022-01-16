import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { rmdirSync, writeFileSync } from 'fs';
import path, { resolve } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('data')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('data')
  uploadData(@Body() body) {
    return this.productsService.uploadDataToDataBase(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/page')
  getPage(@Query() query) {
    console.log(query);
    return this.productsService.getCount(
      query.page,
      query.move,
      query.file,
      query.nameSort,
      query.meaning
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post('getwork')
  @UseInterceptors(FileInterceptor('file'))
  createGetWork(@UploadedFile() file, @Body() body) {
    console.log(body);
    console.log(file);
    return this.productsService.createGetWork(body, file);
  }

  @Post('havework')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(@UploadedFile() file, @Body() body) {
    console.log(body)
    return this.productsService.createHavework(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string | Product> {
    return this.productsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    let file;
    let status;
    await this.productsService.getById(id).then((data) => {
      file = data.file;
      // FileInterceptor(`${res.file}`, { dest: './uploads' });
    })
    .catch(err => {status = `something went wrong - ${err}`});

    const pathFile = resolve('./uploads/' + file.originalname);
    // console.log(file.buffer.buffer);
    writeFileSync(pathFile, file.buffer.buffer);
    setTimeout(() => {
      console.log(resolve('./uploads'));
      rmdirSync(pathFile, { recursive: true });
    }, 8000);
    return res.download(pathFile);
    // const file = '/uploads/avstraliya-brisben-shtat.jpg';
    // return res.download(__dirname + file);
  }
}
