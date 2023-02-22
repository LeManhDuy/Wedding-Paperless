export class LoginUser {
  username: string = "";
  password: string = "";
}

export class RegisterUser {
  fullname: string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmpassword: string | undefined;
  role: string = "User";
}

export class UserToken {
  role: string = "";
  name: string = "";
}
