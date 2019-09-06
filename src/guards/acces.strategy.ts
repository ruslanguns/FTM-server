import * as config from '../config.json';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, Body } from '@nestjs/common';
import { TokenModel } from 'src/database/interfaces';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.token.SECRET_SIGN,
    });
  }

  async validate(tokenData: TokenModel) {
    if (tokenData.isAdmin === false) {
      throw new HttpException(
        { acces: 'Unauthorized', message: 'Admin only' },
        403,
      );
    } else if (tokenData.isAdmin === null) {
      throw new HttpException(
        {
          access: 'Unauthorized',
          message: 'You need to be login to a profile',
        },
        403,
      );
    }
    return tokenData;
  }
}
