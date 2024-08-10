import { Provide } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class MyJwtService {
  constructor(private jwtService: JwtService) {}

  async sign(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verify(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
