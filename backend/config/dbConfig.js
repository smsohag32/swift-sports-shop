import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbLink = `mongodb+srv://smsohag32:${process.env.DB_PASSWORD}@swift-shop.ixqcd.mongodb.net/swift_shop_bd?retryWrites=true&w=majority&appName=swift-shop`;

export const connectDb = async () => {
   try {
      await mongoose.connect(dbLink);
      console.log("database connected");
   } catch (error) {
      console.log("database is not connected");
      console.log(error.message);
   }
};
