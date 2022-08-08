import { Controller, Get, Redirect, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { RolesGuard } from "src/auth/guards/roles.auth.guard";
import { Roles } from "./decarators/roles.users.decorator";
import { UsersService } from "./users.service";

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('getAll')
  async getAll() {
    return this.usersService.getAllUsers();
  }
}
