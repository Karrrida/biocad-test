import express from "express";
import dotenv from "dotenv";
import router from "./routers/routers"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', router);

app.listen(PORT, (): void => {
    console.info('Listening on port', PORT);
});
