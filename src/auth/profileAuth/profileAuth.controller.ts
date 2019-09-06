import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { ProfileAuthService } from './profileAuth.service';
import { TokenModel, Profile } from '../../database/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from '../../familyAccount/profiles/profile.service';
import { checkProfileLogin } from '../../validation/validations';

@Controller()
export class ProfileAuthController {
  constructor(
    private readonly profileAuthService: ProfileAuthService,
    private readonly profileService: ProfileService,
  ) {}

  @UseGuards(AuthGuard('token'))
  @Post('login')
  async login(@Request() req: any, @Body() bodyData: checkProfileLogin) {
    const familyAccountId: string = req.user.familyAccountId;
    const profileData: Profile = await this.profileService.getOneProfile(
      familyAccountId,
      bodyData.profileId,
    );
    if (profileData.password !== null && !req.body.password) {
      throw new HttpException('Password required', 500);
    } else if (profileData.password === null && req.body.password) {
      throw new HttpException('No password required', 500);
    }

    if (!bodyData.password) {
      return this.profileAuthService.loginToProfilWithoutPassword(
        familyAccountId,
        profileData,
      );
    }
    return this.profileAuthService.loginToProfileWithPassword(
      familyAccountId,
      profileData,
      bodyData.password,
    );
  }
}
