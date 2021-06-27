import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//useGuard 전제로 사용가능, req에서 정보 추출 역할
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
