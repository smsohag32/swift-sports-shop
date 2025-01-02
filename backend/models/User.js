import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
   },
   role: {
      type: String,
      default: "admin",
   },
   email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
   },
   password: {
      type: String,
      required: [true, "Password is required."],
   },
   isComplete: {
      type: Boolean,
      default: false,
   },
   status: {
      type: Boolean,
      default: true,
   },
   lastLogin: {
      type: Date,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
   } catch (error) {
      next(error);
   }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
