import express from "express";
import handlebars from "express-handlebars";
import path from "path";

import { rootDir } from "./utils/utils.js";
import { connectMongo } from "./config/mongo.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import Handlebars from "handlebars";

const app = express();

/* DATABASE */
connectMongo();

/* HANDLEBARS */
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(rootDir, "views"));
Handlebars.registerHelper("multiply", (a, b) => a * b);

/* MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use(express.static("src/public"));

/* ROUTES */
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

export default app;