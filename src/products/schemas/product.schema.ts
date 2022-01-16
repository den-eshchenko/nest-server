import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type AddWorkforceType = {
  workforse: string;
  days: number;
  require: string;
  titleJob: string;
  dateStart: string;
};

type FileType = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: string;
  size: string;
};

export type ProductDocument = Product & Document;
@Schema()
export class Product {
  @Prop()
  projectSize: string;
  @Prop()
  jobSector: string;

  @Prop()
  dateCreated: string;

  @Prop()
  projectName: string;

  @Prop()
  projectCity: string;

  @Prop()
  projectProvince: string;

  @Prop()
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    mobilePhone: number;
    address: string;
    etc: string;
    city: string;
    province: string;
    psCode: string;
    canStart: string;
    date: string;
    jobAvailable: string;
    projectName: string;
  };

  @Prop()
  workforces: AddWorkforceType[];

  @Prop()
  selectedJobs: string[];

  @Prop()
  file: FileType;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
