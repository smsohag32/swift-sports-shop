import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbLink = `mongodb+srv://smsohag:${process.env.DB_PASSWORD}@portfolio.0rkgq.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=portfolio`;

export const connectDb = async () => {
   try {
      await mongoose.connect(dbLink);
      console.log("database connected");
   } catch (error) {
      console.log("database is not connected");
      console.log(error.message);
   }
};
