/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ENVIRONMENT: string;
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

export { };
