import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtStrategy } from '../../guards/token.strategy';
import { AccessStrategy } from '../../guards/acces.strategy';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy, AccessStrategy],
})
export class ProfileModule {}
