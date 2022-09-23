export interface LoginInterface {
  email: string,
  password: string
}

export interface RegisterInterface {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

export interface TokenInterface {
  expiresIn: Date,
  access_token: string
}
