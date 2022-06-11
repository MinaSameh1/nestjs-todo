import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCreateDto, AuthInputDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: AuthCreateDto) {
    return this.authService.signUp(body)
  }

  @Post('login')
  login(@Body() body: AuthInputDto) {
    return this.authService.login(body)
  }
}
