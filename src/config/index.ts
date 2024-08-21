import dotenv from "dotenv";
dotenv.config();

const HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const PORT =
  process.env.SERVER_PORT ?? (Number(process.env.SERVER_PORT) || 3000);

const DB_NAME = process.env.DATABASE_NAME;
const DB_HOST = process.env.DATABASE_HOST;
const DB_USER = process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_PORT = Number(process.env.DATABASE_PORT);

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
const JWT_REFRESH_EXPIRATION = Number(process.env.JWT_REFRESH_EXPIRATION);
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY!;
const JWT_ACCESS_EXPIRATION = Number(process.env.JWT_ACCESS_EXPIRATION);

const ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY!;

export const SERVER = {
  HOSTNAME,
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  JWT_REFRESH_EXPIRATION,
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
  JWT_ACCESS_EXPIRATION,
  ENCRYPTION_SECRET_KEY,
};
