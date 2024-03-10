import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { PORT } from "./config/index.js";
import redisClient from "./redis/index.js";
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(PORT || 8000, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Mongo DB Connection Error", err);
  });
