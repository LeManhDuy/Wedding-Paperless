export class LoginUser {
  username: string = "";
  password: string = "";
}

export class RegisterUser {
  fullname?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
  role: string = "User";
}

export class UserToken {
  id?: number;
  username?: string;
  role?: string;
  token?: string;
}

class User {
  id?: number;
  username?: string;
  password?: string;
}
