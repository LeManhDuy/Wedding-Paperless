export const API_URL = {
    GET_CODE_BY_EMAIL :(email: string) => `api/account/forgotPassword/${email}`,
    VALIDATE_VERIFY_CODE :(code: string) => `api/account/validateCode/${code}`,
    RESET_PASSWORD : () => `api/account/resetPassword`,
    CREATE_CONTENT: (personId: number) => `api/content/${personId}`,
    CREATE_ALBUMS: (contentId: number) => `api/albumn/CreateAlbums/${contentId}`,
    CONVERT_BASE64_TO_URL:() => `api/albumn/covertToUrl`,
    CONTET_IS_EXIST_BY_PERSON_ID:(personId: number) => `api/content/checkContentByPersonId/${personId}`,
    GET_CONTENT_BY_ID_ATTACH_ALBUMS:(contentId: number) => `api/content/getContentAttachAlbums/${contentId}`,
    GET_CONTENT_BY_PERSON_ID_ATTACH_ALBUMS :(personId: number) =>`api/content/getContentAttachAlbums/${personId}`,
    REGISTER_SONG_BY_PERSON_ID:(personId :number) =>`api/register-song/register-song-by-person-id/${personId}`,
    UPDATE_CONTENT_BY_ID:(contentId: number) => `api/content/${contentId}`,
    UPDATE_LIST_ALBUM_BY_CONTENT_ID:(contentId: number) => `api/albumn/update-list-album/${contentId}`
};
