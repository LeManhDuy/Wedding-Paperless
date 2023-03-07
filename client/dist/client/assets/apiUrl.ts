import { ResetPassword } from "src/app/models/app-user";

export const API_URL = {
    GET_CODE_BY_EMAIL :(email: string) => `api/account/forgotPassword/${email}`,
    VALIDATE_VERIFY_CODE :(code: string) => `api/account/validateCode/${code}`,
    RESET_PASSWORD : () => `api/account/resetPassword`,
};