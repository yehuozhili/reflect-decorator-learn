import "reflect-metadata";
import * as express from "express";
import controllerStore from "./ioc";
import register from "./register";

const app = express();
register(controllerStore, "/", app);
app.listen(8080, () =>
	console.log("server is running at http://localhost:8080")
);
