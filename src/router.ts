import { Routes } from 'nest-router';
import { FamilyAccountModule } from './auth/familyAccount/familyAccount.module';
import { ProfileModule } from './familyAccount/profiles/profile.module';
import { ProfileAuthModule } from './auth/profileAuth/profileAuth.module';

export const routes: Routes = [
  {
    path: '/auth',
    module: FamilyAccountModule,
    children: [
      {
        path: '/profile',
        module: ProfileAuthModule,
      },
    ],
  },
  {
    path: '/familyAccount',
    children: [
      {
        path: '/profiles',
        module: ProfileModule,
      },
    ],
  },
];
