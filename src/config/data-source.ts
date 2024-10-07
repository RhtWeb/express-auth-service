import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Config } from ".";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Config.DB_HOST,
    port: Number(Config.DB_PORT),
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    // false for production - It create DB Entity Table via sync without migration
    synchronize:
        Config.NODE_ENV === "test" || Config.NODE_ENV === "development",
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
