export const API_URL = {
    GET_CODE_BY_EMAIL :(email: string) => `api/account/forgotPassword/${email}`,
    VALIDATE_VERIFY_CODE :(code: string) => `api/account/validateCode/${code}`,
    RESET_PASSWORD : () => `api/account/resetPassword`,
    CREATE_CONTENT: (idPerson: number) => `api/content?idPerson=${idPerson}`,
    CREATE_ALBUMS: (idContent: number) => `api/albumn/${idContent}`,
    CONVERT_BASE64_TO_URL:() => `api/albumn/covertToUrl`,
};