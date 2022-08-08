import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Registration, RegistrationSchema } from 'src/auth/schemas/registration.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Registration.name, schema: RegistrationSchema }]),
  ],
  providers: [
    UsersService
  ],
  controllers: [
    UsersController
  ],
  exports: [
    UsersService
  ],
})
export class UsersModule {}
