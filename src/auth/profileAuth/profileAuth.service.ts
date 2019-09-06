import { Injectable } from '@nestjs/common';
import {
  FamilyAccountModel,
  Profile,
  ApiError,
  TokenModel,
} from '../../database/interfaces';
import { SECRET_SIGN } from '../../guards/configToken';
import { ProfileService } from '../../familyAccount/profiles/profile.service';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

@Injectable()
export class ProfileAuthService {
  constructor(private readonly profileService: ProfileService) {}

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
      SECRET_SIGN,
      { expiresIn: '1d' },
    );

    const checkPassword = await bcrypt.compare(password, profileData.password);

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
      SECRET_SIGN,
      { expiresIn: '1d' },
    );
    return { token: token };
  }
}
