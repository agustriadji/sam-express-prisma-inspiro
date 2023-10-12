import express, {Request, Response} from "express";
import dotenv from "dotenv";
import serverless from "serverless-http";
import cors from "cors";
import bodyParser from "body-parser";

import {authLogin_Main} from "./tsHandler/auth/main";
import {authMiddle} from "./tsHandler/middleware/auth.middleware";

import jsUser from "./jsHandler/users/main";
import jsProducts from "./jsHandler/products/main";
import jsTransactions from "./jsHandler/transactions/main";

dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());

// JS ROUTES
app.get("/users", authMiddle, jsUser.getUsers_Main);
app.get("/users/:usersId", authMiddle, jsUser.detailUsers_Main);
app.post("/users", authMiddle, jsUser.addUsers_Main);
app.put("/users/:usersId", authMiddle, jsUser.editUsers_Main);
app.put("/users-UpdateStatus/:usersId", authMiddle, jsUser.upateStatusUsers_Main);
app.delete("/users/:usersId", authMiddle, jsUser.removeUsers_Main);

app.get("/products", authMiddle, jsProducts.getProducts_Main);
app.get("/products/:productsId", authMiddle, jsProducts.detailProducts_Main);
app.post("/products", authMiddle, jsProducts.addProducts_Main);
app.put("/products/:productsId", authMiddle, jsProducts.editProducts_Main);
app.put("/products-updatestatus/:productsId", authMiddle, jsProducts.upateStatusProducts_Main);
app.delete("/products/:productsId", authMiddle, jsProducts.removeProducts_Main);

app.get("/transaction", authMiddle, jsTransactions.getTransactions_Main);
app.post("/transaction", jsTransactions.addTransactions_Main);

app.post("/auth-signin", authLogin_Main);

app.get("/", (req: Request, res: Response) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
