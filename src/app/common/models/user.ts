/**
 * Created by garusis on 7/06/18.
 */

export class User {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

export class SystemUser implements User {
  constructor(
    public user_id = null,
    public username = null,
    public email = null,
    public password = null
  ) {}
}

export class ClientUser implements User {
  constructor(
    public user_id = null,
    public username = null,
    public email = null,
    public password = null
  ) {}
}

export interface UserLoginResponse {
  access_token: string;
  user: User;
}
