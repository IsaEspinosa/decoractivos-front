/**
 * Created by garusis on 7/06/18.
 */

export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

export class SystemUser implements User {
  constructor(public user_id = null, public username = null, public email = null, public password = null) {
  }
}

export interface UserLoginResponse {
  token: string;
  user: User;
}