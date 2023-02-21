export class LoginUser {
  username: string = "";
  password: string = "";
}

export class RegisterUser {
  fullname: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  role: string = "User";
}

export class UserToken {
  role: string = "";
  name: string = "";
}
