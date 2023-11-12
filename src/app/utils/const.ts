import { TFormattedProfileFormData, TProfileFormData } from "./types"

export const MAX_NAME_LENGTH = 255
export const MIN_NAME_LENGTH = 1
export const TEL_LENGTH = 10
export const COUNTRY_CODE = '+7'

export const URL_REGEX = /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

export const Pages = ['Home', 'Inventory', 'Reports', 'Billing', 'Profile']

export const formatTelNumber = (phoneNumberString: string) => {
  console.log(phoneNumberString)
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '+7 (' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

export const formatProfileForm = (profileForm: TProfileFormData): TFormattedProfileFormData  => {
  const { area, exchange, subscriber } = profileForm.tel
  return {...profileForm, tel: area + exchange + subscriber}
}
