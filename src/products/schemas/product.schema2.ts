import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument3 = Product3 & Document;

@Schema()
export class Product3 {

  @Prop()
  data: string;

}

export const ProductSchema2 = SchemaFactory.createForClass(Product3);
