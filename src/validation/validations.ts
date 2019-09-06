import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsPositive,
  Max,
  IsIn,
  IsOptional,
  IsEmail,
  MaxLength,
  IsDateString,
  IsArray,
  ValidateIf,
  IsNumber,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

// ------------------------ FOR PROFILE VALIDATIONS -----------------------

// ----- CHECK PROFILE ------
class Profile {
  @ApiModelProperty()
  @IsBoolean()
  readonly isAdmin: boolean;

  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsIn(['H', 'F', 'O', null])
  readonly sexe: any;

  @ApiModelProperty()
  @IsPositive()
  @Max(120)
  readonly age: number;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly password: string;

  @ApiModelProperty()
  @IsDateString()
  readonly birthday: Date;
}

export class checkNewProfile {
  @Type(() => Profile)
  @IsNotEmpty()
  @ApiModelProperty()
  @ValidateNested()
  readonly newProfile: Profile;
}

// ---- CHECK PROFILE ID ---

export class checkProfileId {
  @ApiModelProperty()
  @IsString()
  readonly profileId: string;
}

// ---- CHECK PROFILE LOGIN ----

export class checkProfileLogin extends checkProfileId {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly password: string;
}

// ---- CHECK MODIFY PROFILE -----

// check basic edits
class BasicEditProfile {
  @ApiModelProperty()
  @IsIn(['name', 'sexe', 'age', 'birthday'])
  readonly field: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsOptional()
  @IsIn(['H', 'F', 'O', null])
  readonly value: string;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  @Max(120)
  readonly age: number;

  @ApiModelProperty()
  @IsOptional()
  @IsDateString()
  readonly birthday: string;
}

export class checkBasicEditProfile extends checkProfileId {
  @Type(() => BasicEditProfile)
  @IsNotEmpty()
  @ApiModelProperty()
  @ValidateNested({ each: true })
  readonly edits: BasicEditProfile;
}

// check admin edits
export class checkAdminEditProfile extends checkProfileId {
  @ApiModelProperty()
  @IsOptional()
  @IsBoolean()
  readonly isAdmin: boolean;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly password: string;
}

// ------------------------ FOR FAMILY ACCOUNT VALIDATIONS -----------------------

// ---- CHECK FAMILY ACCOUNT REGISTER -----

class FamilyAccountRegister {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  @MaxLength(15)
  readonly name: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;

  @ApiModelProperty()
  @IsString()
  readonly confirmPassword: string;
}

export class checkFamilyAccountRegister {
  @Type(() => FamilyAccountRegister)
  @IsNotEmpty()
  @ApiModelProperty()
  @ValidateNested()
  readonly newFamilyAccount: FamilyAccountRegister;
  @Type(() => Profile)
  @ApiModelProperty()
  @ValidateNested()
  readonly defaultProfile: Profile;
}

// ---- CHECK FAMILY ACCOUNT LOGIN -----

export class checkFamilyAccountLogin {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;
}
