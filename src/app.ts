import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import authRouter from "./routes/authRoute.js";
import { ErrorHandler } from "./utils/middlewares.js";

// app
const app: Express = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
const PORT = parseInt(process.env.PORT!) || 3001;
const appPrefix = "/api";

// routes
app.use(appPrefix, authRouter);

// middlewares
app.use(ErrorHandler);

// server
app.listen(PORT, () => console.log(`Server running at port :${PORT} `));
