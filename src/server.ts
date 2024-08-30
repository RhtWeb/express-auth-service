import app from "./app";
import { Config } from "./config";

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
        app.listen(Config.PORT, () => {
            if (PORT && NODE_ENV) {
                console.log(
                    `[Server]: In ${NODE_ENV} envornment listing to port ${PORT}`,
                );
            }
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

startServer();
