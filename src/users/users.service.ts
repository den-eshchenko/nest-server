import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

export type User = {
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: process.env.USER_LOGIN,
      password: process.env.USER_PASSWORD,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    console.log(username);
    return this.users.find((user) => user.username === username);
  }
}
