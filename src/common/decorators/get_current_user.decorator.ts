import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  if(!data) return req.user
  return req.user[data]
})

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
  const req = context.switchToHttp().getRequest();
  return req.user['id']
})

export default GetCurrentUser
