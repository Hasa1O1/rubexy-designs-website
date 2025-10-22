/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_ENABLED?: string
  readonly VITE_ANALYTICS_ID?: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

