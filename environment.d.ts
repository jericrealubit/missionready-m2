declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PREDICTION_KEY: string;
      NEXT_PUBLIC_PREDICTION_URL: string;
    }
  }
}
