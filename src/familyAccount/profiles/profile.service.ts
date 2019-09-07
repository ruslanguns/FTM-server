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
    profiles.forEach(profile => delete profile.password);

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
    ).exec();

    // TODO fix this
    if (!profileDeleted) {
      throw new HttpException('No profile found', 404);
    }
  }

  async editProfile(
    familyAccountId: string,
    modificationType: ModificationType,
  ) {
    const profileModification: ModificationType = modificationType;
    switch (profileModification.kind) {
      case 'basic':
        const field: string = profileModification.modification.field;
        await FamilyAccountModel.findOneAndUpdate(
          {
            _id: familyAccountId,
          },
          {
            $set: {
              //prettier-ignore
              [`profiles.$[elem].${field}`]: profileModification.modification[field]
            },
          },
          { arrayFilters: [{ 'elem.id': profileModification.profileId }] },
        ).exec();
        break;
      case 'admin':
        console.log('admin');
        break;

      case 'assignTasks':
        console.log('task');
        break;
    }
  }
}
