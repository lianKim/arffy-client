interface ImportMetaEnv {
  // PG CID
  readonly VITE_KAKAO_PAY_CID: string;
  readonly VITE_TOSS_PAY_CID: string;
  readonly VITE_KG_INICIS_CID: string;
  // base URL
  readonly VITE_USER_SERVER_BASE_URL: string;
  readonly VITE_ADMIN_SERVER_BASE_URL: string;
  readonly VITE_CLIENT_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
