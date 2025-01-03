import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const createUser = async (req, res) => {
   try {
      const { firstName, lastName, email, password, role = "ADMIN", status } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: "User already exists." });
      }

      // Create new user
      const newUser = new User({
         firstName,
         lastName,
         email,
         password,
         role,
         status,
      });

      const savedUser = await newUser.save();

      res.status(201).json({ message: "User created successfully.", user: savedUser });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const signUp = async (req, res) => {
   try {
      const { name, email, password, role, profile = "" } = req.body;
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: "User already exists." });
      }
      const newUser = new User({
         name,
         email,
         profile,
         password,
         role,
      });

      const savedUser = await newUser.save();
      const { password: _, ...userWithoutPassword } = savedUser.toObject();
      res.status(201).json({ user: userWithoutPassword });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// User Sign-in
export const signIn = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: "Invalid email or password." });
      }

      // Compare password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid email or password." });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
         expiresIn: "1h",
      });

      const { password: _, ...restUser } = user.toObject();
      res.status(200).json({ token, user: restUser });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const changeUserStatus = async (req, res) => {
   const userId = req.params.id;
   console.log(userId);
   const { status } = req.body;

   try {
      // Find the user by ID and update the status
      const user = await User.findByIdAndUpdate(userId, { status: status }, { new: true });

      console.log(user);
      // If user not found
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      // Send the updated user data as a response
      return res.status(200).json({
         message: "User status updated successfully",
         user: user,
      });
   } catch (error) {
      console.error("Error updating user status:", error);
      return res.status(500).json({ message: "Internal Server Error" });
   }
};

export const updateUser = async (req, res) => {
   try {
      const { name, email, profile, status } = req.body;
      const currentEmail = req.params.email;

      const query = { email: currentEmail };
      const user = await User.findOne(query);

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      // Update fields dynamically
      if (name) user.name = name;
      if (profile) user.profile = profile;
      if (status !== undefined) user.status = status;

      if (email && email !== currentEmail) {
         const emailExists = await User.findOne({ email });
         if (emailExists) {
            return res.status(400).json({ message: "Email already in use" });
         }
         user.email = email;
      }

      user.updatedAt = new Date();
      const updatedUser = await user.save();
      res.status(200).json({ message: "User updated successfully." });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const updateUserRole = async (req, res) => {
   try {
      const { role } = req.body;
      const email = req.params.email;
      const query = { email };
      const updatedDoc = {
         $set: { role },
      };
      const result = await User.updateOne(query, updatedDoc, { upsert: true });
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get All Users
export const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete User
export const deleteUser = async (req, res) => {
   try {
      const email = req.params.email;
      const result = await User.deleteOne({ email });
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
