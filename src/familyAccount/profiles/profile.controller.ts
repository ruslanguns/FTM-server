import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  UsePipes,
  ValidationPipe,
  HttpException,
  Delete,
  Get,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import {
  checkNewProfile,
  checkProfileId,
  checkBasicEditProfile,
} from '../../validation/validations';
import { Profile, TokenModel } from '../../database/interfaces';
import { EditProfilePipe } from '../../validation/validationEditProfile.pipe';

@Controller()
export class ProfileController {
  constructor(private readonly profilsService: ProfileService) {}

  @UseGuards(AuthGuard('access'))
  @UsePipes()
  @Post('new')
  async createProfil(@Body() bodyData: checkNewProfile, @Request() req: any) {
    // Variables
    const familyAccountId = req.user.familyAccountId;
    // prettier-ignore
    const newProfile: Profile = {
      ...bodyData.newProfile,
      id: '_' + Math.random().toString(36).substr(2, 9),
      assignTasks: [],
    };

    // Check for password/admin - no password/no admin
    if (!newProfile.isAdmin && newProfile.password) {
      throw new HttpException('Non admin profiles not requires password', 400);
    } else if (newProfile.isAdmin && !newProfile.password) {
      throw new HttpException('Admin profile requires password', 400);
    } else if (!newProfile.isAdmin) {
      newProfile.password = null;
    }

    await this.profilsService.createProfile(familyAccountId, newProfile);
    return { status: 201, message: 'Profile created' };
  }

  @UseGuards(AuthGuard('access'))
  @UsePipes()
  @Delete('delete')
  async deleteProfile(@Request() req: any, @Body() bodyData: checkProfileId) {
    const tokenData: TokenModel = req.user;
    await this.profilsService.deleteProfile(
      tokenData.familyAccountId,
      bodyData.profileId,
    );
    return { message: 'deleted' };
  }

  @UseGuards(AuthGuard('access'))
  @UsePipes(EditProfilePipe)
  @Put('basicEdits')
  async basicEditProfile(
    @Request() req: any,
    @Body() bodyData: checkBasicEditProfile,
  ) {
    return bodyData;
  }

  @UseGuards(AuthGuard('token'))
  @Get()
  async getProfiles(@Request() req: any) {
    return {
      profiles: await this.profilsService.getProfiles(req.user.familyAccountId),
    };
  }
}
