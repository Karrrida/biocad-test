import express from "express";
import router from "./routers/routers"
import {PORT} from "./config";
import {connectDB} from "./db";

const app = express();

const startServer = () => {
    app.use(express.json());
    app.use('/', router);

    app.listen(PORT, (): void => {
        console.info('Listening on port', PORT);
    });
};

const initApp = async () => {
    try {
        await connectDB();

        startServer();
    }catch(err) {
        console.error("Failed to connect to DB", err);
        process.exit(1);
    }
}

initApp();
