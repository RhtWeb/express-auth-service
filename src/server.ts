import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";

// pretttier and eslint error
// function login(name: string): string {
//     const user = { firstname: "Rohit",
//     };
//     const firstname = user[firstname];
//     console.log(`${name} ${firstname} ur TS is compiled`);
//     return firstname + name;
// }

// login("computer");

// console.log("PORT", Config.PORT);

function startServer() {
    try {
        const { PORT, NODE_ENV } = Config;
        logger.debug("trying to start server");
        // throw new Error("Someting went wrong, cannot start the server!!")
        app.listen(Config.PORT, () => {
            if (PORT && NODE_ENV) {
                logger.info(
                    `[Server]: In ${NODE_ENV} envornment listing to port ${PORT}`,
                    { server: "running" },
                );
                // console.log(
                //     `[Server]: In ${NODE_ENV} envornment listing to port ${PORT}`
                // );
            }
        });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message);
            // console.error(err.message);
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        }
    }
}

startServer();
