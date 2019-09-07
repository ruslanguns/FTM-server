import { Injectable, HttpException } from '@nestjs/common';
import {
  FamilyAccountModel,
  Profile,
  MongoError,
  FamilyAccount,
} from '../../database/interfaces';
import * as config from '../../config.json';
import { Pass } from '../../private/hash';
const jwt = require('jsonwebtoken');

@Injectable()
export class FamilyAccountService {
  constructor(private readonly pass: Pass) { }
  async register(
    newFamilyAccount: FamilyAccount,
  ): Promise<MongoError | FamilyAccount> {
    // Account object
    newFamilyAccount.password = await this.pass.hash(newFamilyAccount.password);

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
      const checkPassword = await this.pass.verify(data.password, password);
      if (!checkPassword) {
        throw new HttpException('Wrong password', 400);
      } else {
        const token: string = await jwt.sign(
          { familyAccountId: data.id, currentProfile: null, isAdmin: null },
          config.token.SECRET_SIGN,
          { expiresIn: '1d' },
        );
        return token;
      }
    }
  }

  async existFamilyAccount(familyAccountId: any): Promise<boolean> {
    const checkExist = await FamilyAccountModel.findById(familyAccountId);
    if (!checkExist) return false;
    return true;
  }
}
