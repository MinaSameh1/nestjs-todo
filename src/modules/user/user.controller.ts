import { Controller, Get, Post, Body } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { UserService } from './user.service'
import { UserInputDTO } from './dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetCurrentUserId() id: number) {
    return this.userService.getSelf(id)
  }

  @Post()
  updateUser(@GetCurrentUserId() id: number, @Body() input: UserInputDTO) {
    return this.userService.update(id, input)
  }
}
