import * as mongoose from 'mongoose';

// ---- Family Account ----
const familyAccountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  profiles: { type: Array },
  tasks: { type: Array },
});

export interface FamilyAccount {
  id: string;
  email: string;
  name: string;
  password: string;
  profiles: Profiles;
  tasks: Array<object>;
}

export const FamilyAccountModel = mongoose.model(
  'FamilyAcount',
  familyAccountSchema,
);

// ---- Profile -----

export interface Profile {
  readonly id: string;
  name: string;
  age: number;
  sexe: 'H' | 'F' | 'O' | null;
  isAdmin: boolean;
  password: string;
  assignTasks: Array<object>;
  birthday: Date;
}

// ---- Profile Modifications ----

// basics modifications for name/age/sexe

export interface Basic {
  field: 'name' | 'age' | 'sexe' | 'birthday';
  name?: string;
  age?: number;
  sexe?: 'H' | 'F' | 'O' | null;
  birthday?: string;
}

// modifications for isAdmin / password
export interface Admin {
  field: 'isAdmin' | 'password';
  value: boolean | string;
}

// modifcations for assignTasks
export interface AssignTasks {}

export interface BasicEditProfile {
  readonly kind: 'basic';
  readonly profileId: string;
  readonly modification: Basic;
}
export interface AdminEditProfile {
  readonly kind: 'admin';
  readonly profileId: string;
  readonly modification: Admin;
}
export interface TaskEditProfile {
  readonly kind: 'assignTasks';
  readonly profileId: string;
  readonly modification: AssignTasks;
}

export type ModificationType =
  | BasicEditProfile
  | AdminEditProfile
  | TaskEditProfile;

export interface Profiles extends Array<Profile> {}

// ---- Token ----

export interface TokenModel {
  familyAccountId: string;
  currentProfil: string;
  isAdmin: boolean;
}
// ---- Mongo Error ----

export interface MongoError {
  driver: boolean;
  name: string;
  index: number;
  code: number;
  errmsg: string;
}

// ---- API Error ----
export interface ApiError {
  code: number;
  errormsg: string;
}

// ----- FUNCTIONS -------
