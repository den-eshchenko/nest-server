import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { Product3, ProductSchema2 } from './schemas/product.schema2';

@Module({
  providers: [ProductsService], // то что будет переиспользоваться - любые компоненты с логикой
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }, { name: Product3.name, schema: ProductSchema2 }]),
  ],
})
export class ProductsModule {}
