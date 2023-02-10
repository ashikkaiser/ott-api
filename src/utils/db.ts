import mongoose from "mongoose";
import { config } from "./config";
import { logger } from "./logger";
export const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    logger.info(`Connected to mongo at ${config.DB_URI}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
