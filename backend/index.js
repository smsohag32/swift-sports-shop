import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
import { connectDb } from "./config/dbConfig.js";

import userRoute from "./routes/userRoute.js";

const corsOptions = {
   origin: "*",
   credentials: true,
   optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

connectDb();

app.get("/", (req, res) => {
   res.send("server is running");
});

// api
app.use("/api/v1", userRoute);

app.listen(port, async () => {
   console.log("server is running");
});
