import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest()
    if (data) return req.user[data]
    return req.user
  }
)

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const req = context.switchToHttp().getRequest()
    return req.user['id']
  }
)

export default GetCurrentUser
