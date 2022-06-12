import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCreateDto, AuthInputDto } from './dto'
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards'
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators'
import { jwtPayload_refresh } from './types'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() body: AuthCreateDto) {
    return this.authService.signUp(body)
  }

  @Public()
  @Post('login')
  login(@Body() body: AuthInputDto) {
    return this.authService.login(body)
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    if (this.authService.logout(userId)) {
      return {
        message: 'success',
        error: false
      }
    }
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@GetCurrentUser() user: jwtPayload_refresh) {
    return this.authService.refreshTokens(user.id, user.refreshToken)
  }
}
