import { TProfileFormData, TProfileForm, TUser } from "./types";

export const formatTelNumber = (phoneNumberString: string) => {
  console.log(phoneNumberString)
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '+7 (' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

export const formatProfileForm = (profileForm: TProfileForm): TProfileFormData  => {
  const { area, exchange, subscriber } = profileForm.tel
  return {...profileForm, tel: parseInt(area + exchange + subscriber)}
}
