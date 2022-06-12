import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

export class AccessTokenGuard extends AuthGuard('jwt') {
  private reflector

  constructor(reflector: Reflector) {
    super()
    this.reflector = new Reflector()
  }

  canActivate(context: ExecutionContext) {
    if (
      this.reflector.getAllAndOverride('isPublic', [
        context.getHandler(),
        context.getClass()
      ])
    ) {
      return true
    }
    return super.canActivate(context)
  }
}
