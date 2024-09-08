import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";

function startServer() {
    try {
        const { PORT, NODE_ENV } = Config;
        logger.debug("trying to start server");
        // throw new Error("Someting went wrong, cannot start the server!")
        // OR
        // const err = createHttpError(500, 'Someting went wrong, cannot start the server!!');
        // throw err;
        app.listen(Config.PORT, () => {
            if (PORT && NODE_ENV) {
                logger.info(
                    `[Server]: In ${NODE_ENV} environment listing to port ${PORT}`,
                    { server: "running" },
                );
                // console.log(
                //     `[Server]: In ${NODE_ENV} environment listing to port ${PORT}`
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
