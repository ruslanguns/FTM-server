import { Injectable, HttpException } from '@nestjs/common';
import {
  Profile,
  FamilyAccountModel,
  ModificationType,
} from '../../database/interfaces';
const bcrypt = require('bcrypt');

@Injectable()
export class ProfileService {
  constructor() {}

  async getOneProfile(
    familyAccountId: string,
    profileId: string,
  ): Promise<Profile> {
    // Get profile data
    const dataProfile: Profile = (await FamilyAccountModel.findOne(
      { _id: familyAccountId },
      { profiles: { $elemMatch: { id: profileId } }, _id: 0 },
    )).profiles[0];

    if (!dataProfile) {
      throw new HttpException('No profile found', 404);
    }
    // return the profile
    return dataProfile;
  }

  async getProfiles(familyAccountId: string): Promise<Array<Profile>> {
    const profiles: Array<Profile> = (await FamilyAccountModel.findById(
      familyAccountId,
      { profiles: 1, _id: 0 },
    )).profiles;

    return profiles;
  }

  async createProfile(familyAccountId: string, newProfile: Profile) {
    // insert new profile
    if (newProfile.password) {
      newProfile.password = bcrypt.hash(newProfile.password, 5);
    }
    const profileData = await FamilyAccountModel.findByIdAndUpdate(
      familyAccountId,
      { $push: { profiles: newProfile } },
    ).exec();
    return profileData;
  }

  async deleteProfile(familyAccountId: string, profileId: string) {
    // delete profile
    const profileDeleted = await FamilyAccountModel.findByIdAndUpdate(
      familyAccountId,
      {
        $pull: { profiles: { id: profileId } },
      },
    );

    // TODO fix this
    if (!profileDeleted) {
      throw new HttpException('No profile found', 404);
    }
  }

  async modifyProfile(
    familyAccountId: string,
    modificationType: ModificationType,
  ) {
    const profileModification: ModificationType = modificationType;
    switch (profileModification.kind) {
      case 'basic':
        break;
      case 'admin':
        console.log('admin');
        break;

      case 'assignTasks':
        console.log('task');
        break;
    }

    // const profileModified = await FamilyAccountModel.findByIdAndUpdate();
  }
}
