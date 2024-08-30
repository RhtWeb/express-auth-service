import winston from "winston";
import { Config } from ".";

const logger = winston.createLogger({
    // ctrl + space to show options
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    defaultMeta: { serviceName: "setUp-service" },
    transports: [
        new winston.transports.File({
            dirname: "logs",
            filename: "combine.log",
            level: "info",
            silent: Config.NODE_ENV === "production",
        }),
        new winston.transports.File({
            dirname: "logs",
            filename: "error.log",
            level: "error",
            silent: Config.NODE_ENV === "production",
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
            silent: Config.NODE_ENV === "production",
        }),
    ],
});

// if (Config.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }

export default logger;
