import { Injectable } from '@nestjs/common';
import {
  FamilyAccountModel,
  Profile,
  ApiError,
  TokenModel,
} from '../../database/interfaces';
import * as config from '../../config.json';
import { ProfileService } from '../../familyAccount/profiles/profile.service';
import { Pass } from '../../private/hash';

const jwt = require('jsonwebtoken');

@Injectable()
export class ProfileAuthService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly pass: Pass,
  ) {}

  async loginToProfileWithPassword(
    familyAccountId: string,
    profileData: Profile,
    password: string,
  ) {
    const token = jwt.sign(
      {
        familyAccountId: familyAccountId,
        currentProfile: profileData.id,
        isAdmin: profileData.isAdmin,
      },
      config.token.SECRET_SIGN,
      { expiresIn: '1d' },
    );

    const checkPassword = await this.pass.verify(
      profileData.password,
      password,
    );

    if (checkPassword) {
      return { token: token };
    }
    return { errormsg: 'wrong password', code: 89 } as ApiError;
  }

  async loginToProfilWithoutPassword(
    familyAccountId: string,
    profileData: Profile,
  ) {
    const token = jwt.sign(
      {
        familyAccountId: familyAccountId,
        currentProfile: profileData.id,
        isAdmin: profileData.isAdmin,
      },
      config.token.SECRET_SIGN,
      { expiresIn: '1d' },
    );
    return { token: token };
  }
}
