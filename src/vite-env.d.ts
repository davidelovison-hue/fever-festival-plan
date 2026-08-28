/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GUIDED_PLAN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
