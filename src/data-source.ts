import "reflect-metadata";
import { DataSource } from "typeorm";
import { Posts } from "./entity/Posts";
import { Users } from "./entity/Users";
import { Comments } from "./entity/Comments";
import { CreateSchema1678681500130 } from "./migration/1710338262189-data-source";
import "dotenv/config";

type DatabaseType =
  | "sqlite"
  | "mysql"
  | "postgres"
  | "mariadb"
  | "mssql"
  | "oracle";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as DatabaseType,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: true,
  logging: false,
  entities: [Users, Posts, Comments],
  subscribers: [],
  // migrations: [CreateSchema1678681500130],
});
