export interface User {
    username: string;
    password: string;
  }

export interface UserRegistration extends User {
    email: string;
}

export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export type RefreshToken = Omit<Tokens, "access_token">; 
export type AccessToken = Omit<Tokens, "refresh_token">; 