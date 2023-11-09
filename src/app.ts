import express, { Express, Request, Response } from "express";
import morgan from "morgan";

// app
const app: Express = express();
app.use(morgan("dev"));
const PORT = process.env.PORT || 3001;

// routes
app.get("/", (req: Request, resp: Response) => {
  resp.json("express server updated");
});

// server
app.listen(PORT, () => console.log(`Server running at port :${PORT} `));
