import { Controller, Get } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetCurrentUserId() id: number) {
    return this.userService.getSelf(id)
  }
}
