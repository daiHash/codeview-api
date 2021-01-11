import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// Custom Decorator to get user from request session
// https://stackoverflow.com/a/62302948
export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
