import express from "express";
import dotenv from "dotenv";
import connection from "./utils/db.js";
import coffeeRouter from "./routes/coffee.route.js";
import userRouter from "./routes/user.route.js";
import stripeRouter from "./routes/stripe.route.js";
import ordersRouter from "./routes/orders.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello there" });
});

connection()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️   Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

app.use("/api/v1/coffee", coffeeRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/orders", ordersRouter);
