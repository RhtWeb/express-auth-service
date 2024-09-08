import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import logger from "./config/logger";

const app = express();
// app.use(express.json());

// /* eslint-disable @typescript-eslint/no-misused-promises */
// // eslint-disable-next-line @typescript-eslint/require-await
// app.get("/", async (req, res, next) => {
//     const err = createHttpError(401, 'Not Authorised to access the resource');
//     next(err);
//     // res.send("Hello World");
// });

app.get("/", function (req, res) {
    // const err = createHttpError(401, 'Not Authorised to access the resource');
    // throw err;
    res.send("Hello World");
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    logger.error(err.message, { statusCode });
    return res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                message: err.message,
                path: "",
                location: "",
            },
        ],
    });

    next();
});

export default app;
