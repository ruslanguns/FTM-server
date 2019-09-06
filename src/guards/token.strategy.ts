import * as config from '../config.json';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenModel } from '../database/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'token') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.token.SECRET_SIGN,
    });
  }

  async validate(tokenInfo: TokenModel) {
    return tokenInfo as TokenModel;
  }
}
