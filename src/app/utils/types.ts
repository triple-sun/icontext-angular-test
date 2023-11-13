import { Role } from "./const";

export type TUser = {
  id: number;
  email: string
  firstName: string;
  lastName:string;
  tel: number;
  website: string;
  password: string;
  role: null;
}

export type TTel = {
  area: string;
  exchange: string;
  subscriber: string;
}

export type TProfileForm = Pick<TUser, 'firstName' | 'lastName' | 'website' | 'email'> & { tel: TTel}

export type TProfileFormData = Omit<TUser,'password' | 'id' | 'role'>
