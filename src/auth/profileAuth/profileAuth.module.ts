import { Module } from '@nestjs/common';
import { ProfileAuthController } from './profileAuth.controller';
import { ProfileAuthService } from './profileAuth.service';
import { ProfileService } from '../../familyAccount/profiles/profile.service';
import { JwtStrategy } from '../../guards/token.strategy';
import { Pass } from '../../private/hash';

@Module({
  imports: [],
  controllers: [ProfileAuthController],
  providers: [ProfileAuthService, ProfileService, JwtStrategy, Pass],
})
export class ProfileAuthModule {}
