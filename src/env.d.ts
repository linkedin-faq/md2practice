/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
