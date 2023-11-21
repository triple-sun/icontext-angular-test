export const MAX_NAME_LENGTH = 255
export const MIN_NAME_LENGTH = 1

export const MIN_PASS_LENGTH = 8
export const MAX_PASS_LENGTH = 24

export const TEL_LENGTH = 10
export const COUNTRY_CODE = '+7'

export const AUTH_API_URL = 'http://localhost:3000/api/auth/';
export const TEST_API_URL = 'http://localhost:3000/api/test/';
export const USERS_API_URL = 'http://localhost:3000/api/users/';
export const USER_KEY = 'auth-user'

export const COOKIE_NAME = 'angCookie'

export const URL_REGEX = /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const Pages = ['Home', 'Inventory', 'Reports', 'Billing']

export enum Role {
  Admin,
  Customer
 }
