import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistrationDocument = Registration & Document;
@Schema({ timestamps: true })
export class Registration {

  // @Prop(raw({
  //   username: { type: String, required: true },
  //   password: { type: String, required: true },
  //   email: { type: String, required: true },
  // }))
  // user: {
  //   username: string;
  //   password: string;
  //   email: string;
  // }

  @Prop({ type: String, required: true })
  username: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true })
  email: string;

}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);
