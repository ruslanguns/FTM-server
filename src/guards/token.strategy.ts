import * as config from '../config.json';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenModel } from '../database/interfaces';
import { FamilyAccountService } from '../auth/familyAccount/familyAccount.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'token') {
  constructor(
    private readonly familyAccountService: FamilyAccountService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.token.SECRET_SIGN,
    });
  }

  async validate(tokenInfo: TokenModel) {
    // store the output result.. 
    // const output = await this.familyAccountService.existFamilyAccount(/** USER ID */); // <<------|
    return tokenInfo as TokenModel;
  }
}
