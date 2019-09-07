import { Module } from '@nestjs/common';
import { ProfileAuthController } from './profileAuth.controller';
import { ProfileAuthService } from './profileAuth.service';
import { ProfileService } from '../../familyAccount/profiles/profile.service';
import { JwtStrategy } from '../../guards/token.strategy';
import { Pass } from '../../private/hash';

// If you want to inject services from external modules you have to import them.
import { FamilyAccountModule } from '../familyAccount/familyAccount.module';

@Module({
  imports: [FamilyAccountModule], // Importing module Family.
  controllers: [ProfileAuthController],
  providers: [ProfileAuthService, ProfileService, JwtStrategy, Pass],
})
export class ProfileAuthModule { }
