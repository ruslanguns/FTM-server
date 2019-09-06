import { Module } from '@nestjs/common';
import { FamilyAccountService } from './familyAccount.service';
import { FamilyAccountController } from './familyAccount.controller';

@Module({
  imports: [],
  controllers: [FamilyAccountController],
  providers: [FamilyAccountService],
})
export class FamilyAccountModule {}
