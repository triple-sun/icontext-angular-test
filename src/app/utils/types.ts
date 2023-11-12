export type TTelFormData = {
  area: string;
  exchange: string;
  subscriber: string;
}

export type TProfileFormData = {
  firstName: string;
  lastName:string;
  tel: TTelFormData
  website: string;
}

export type TFormattedProfileFormData = Pick<TProfileFormData, 'firstName' | 'lastName' | 'website'> & { tel: string }
