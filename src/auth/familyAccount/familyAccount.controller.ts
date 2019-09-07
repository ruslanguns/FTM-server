import {
  Controller,
  Post,
  Body,
  HttpException,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { FamilyAccountService } from './familyAccount.service';
import { FamilyAccount, Profile } from '../../database/interfaces';
import {
  CheckFamilyAccountRegister,
  CheckFamilyAccountLogin,
} from '../../validation/validations';
const bcrypt = require('bcrypt');

@Controller()
export class FamilyAccountController {
  constructor(private readonly familyAccountService: FamilyAccountService) {}

  @Post('register')
  @UsePipes()
  async register(@Body() bodyData: CheckFamilyAccountRegister) {
    // check passwords
    if (
      bodyData.newFamilyAccount.password !==
      bodyData.newFamilyAccount.confirmPassword
    ) {
      throw new HttpException('wrong passwords', 400);
    }

    console.log(bodyData.defaultProfile);
    //prettier-ignore
    const defaultProfile : Profile = {
      ...bodyData.defaultProfile,
      id : '_' + Math.random().toString(36).substr(2, 9),
      assignTasks : []
    }
    console.log(defaultProfile);
    // hash password
    defaultProfile.password = await bcrypt.hash(defaultProfile.password, 5);

    const newfamilyAccount: FamilyAccount = {
      ...bodyData.newFamilyAccount,
      profiles: [defaultProfile],
      id: '', //null id cause mongoDB generate an id
      tasks: [],
    };
    return await this.familyAccountService.register(newfamilyAccount);
  }

  @Post('login')
  @UsePipes()
  async login(@Body() bodyData: CheckFamilyAccountLogin) {
    const token: string = await this.familyAccountService.login(
      bodyData.email,
      bodyData.password,
    );
    return { token: token };
  }
}
