import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registration, RegistrationDocument } from 'src/auth/schemas/registration.schema';

export type User = {
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Registration.name) private RegistrationModel: Model<RegistrationDocument>,
  ) {}

  async getAllUsers() {
    const allUsers = await this.RegistrationModel.find().exec();
    return allUsers;
  }
}
