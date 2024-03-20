import * as express from "express";
import * as bodyParser from "body-parser";
import type { Request, Response, NextFunction } from "express";
import { routes, RouteType } from "./routes";
import { AppDataSource as connection } from "./data-source";
import "dotenv/config";

const app = express();

try {
  connection.initialize();
  console.log("Connected to database successfully!");
} catch (error) {
  console.error("Error connecting to database:", error);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

routes.map((route: RouteType) => {
  const { method, path, controller, middleware } = route;
  if (middleware) app[method](path, middleware, controller);
  else app[method](path, controller);
});

app.listen(3000, async () => {
  console.log(`\n\x1b[36mREST API is running at: localhost:3000\x1b[0m`);
});
