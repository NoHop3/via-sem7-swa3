export interface User {
  username: string;
  password?: string;
}

export interface AuthenticatedUser extends User {
  id: string;
  admin: boolean;
}
