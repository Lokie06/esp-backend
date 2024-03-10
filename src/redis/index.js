import { createClient } from "redis";
import { REDIS_PASSWORD, REDIS_PORT, REDIS_URL } from "../config/index.js";

const redisClient = createClient({
  password: REDIS_PASSWORD,
  socket: { host: REDIS_URL, port: REDIS_PORT },
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected successfully");
  } catch (error) {
    console.error("Redis Connection Error", error);
    process.exit(1);
  }
})();

export default redisClient;
