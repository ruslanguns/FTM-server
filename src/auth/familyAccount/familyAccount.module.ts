import { Module } from '@nestjs/common';
import { FamilyAccountService } from './familyAccount.service';
import { FamilyAccountController } from './familyAccount.controller';
import { Pass } from '../../private/hash';

@Module({
  imports: [],
  controllers: [FamilyAccountController],
  providers: [FamilyAccountService, Pass],
})
export class FamilyAccountModule {}
