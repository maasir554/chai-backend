import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path: "./env",
});
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Express Server Running on http://localhost:${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("Unable to start express server. :-(");
    });
