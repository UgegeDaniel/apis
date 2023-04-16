import  { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string;
      ENVIRONMENT: 'development' | 'production';
      DB_USER: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_DATABASE: string;
      JWT_SECRET: Secret;
      BCRYPT_SALT: string;
      ERD: string;
    }
  }
}

export { }