/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICE_PROTO: string;
  readonly VITE_SERVICE_HOSTNAME: string;
  readonly VITE_SERVICE_PORT?: number;
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv;
}