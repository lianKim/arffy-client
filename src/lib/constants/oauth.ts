const { VITE_CLIENT_BASE_URL, VITE_USER_SERVER_BASE_URL } = import.meta.env;

const REDIRECT_URI = `${VITE_CLIENT_BASE_URL}/auth`;
export const KAKAO_AUTH_URL = `${VITE_USER_SERVER_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
