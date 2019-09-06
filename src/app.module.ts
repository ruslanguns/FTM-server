import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from 'nest-router';
import { ProfileModule } from './familyAccount/profiles/profile.module';
import { FamilyAccountModule } from './auth/familyAccount/familyAccount.module';
import { routes } from './router';
import { ProfileAuthModule } from './auth/profileAuth/profileAuth.module';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ProfileModule,
    FamilyAccountModule,
    ProfileAuthModule,
    ProfileAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
