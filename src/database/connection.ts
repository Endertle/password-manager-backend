import { Sequelize } from "sequelize-typescript";
import { SERVER } from "../config";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: SERVER.DB_NAME,
  username: SERVER.DB_USER,
  password: SERVER.DB_PASSWORD,
  host: SERVER.DB_HOST,
  port: SERVER.DB_PORT,

  models: [__dirname + "/models"],
  logging: false,
});

export default sequelize;
