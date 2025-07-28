/// <reference types="vite/client" />
// 
// // Type declarations for Vite env variables
interface ImportMetaEnv {
    readonly VITE_LLM_PROVIDER?: string;
    readonly VITE_LLM_BASE_URL?: string;
    readonly VITE_OPENAI_API_KEY?: string;
    readonly VITE_API_HOST?: string;
    // add other env variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
