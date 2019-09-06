import { Injectable, HttpException } from '@nestjs/common';
import {
  FamilyAccountModel,
  Profile,
  MongoError,
  FamilyAccount,
} from '../../database/interfaces';
import { SECRET_SIGN } from '../../guards/configToken';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

@Injectable()
export class FamilyAccountService {
  async register(
    newFamilyAccount: FamilyAccount,
  ): Promise<MongoError | FamilyAccount> {
    // Account object
    newFamilyAccount.password = await bcrypt.hash(newFamilyAccount.password, 5);

    // Create family account
    try {
      const accountData: FamilyAccount = await FamilyAccountModel.create(
        newFamilyAccount,
      );
      return accountData;
    } catch (err) {
      if (err.code === 11000) {
        throw new HttpException('Email already used', 403);
      }
    }
  }

  async login(email: string, password: string): Promise<any> {
    const data = await FamilyAccountModel.findOne().where({ email: email });
    if (!data) {
      throw new HttpException('Email not found', 404);
    } else {
      const checkPassword = await bcrypt.compare(password, data.password);
      if (!checkPassword) {
        throw new HttpException('Wrong password', 400);
      } else {
        const token: string = await jwt.sign(
          { familyAccountId: data.id, currentProfile: null, isAdmin: null },
          SECRET_SIGN,
          { expiresIn: '1d' },
        );
        return token;
      }
    }
  }
}
