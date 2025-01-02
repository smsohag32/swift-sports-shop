import { Router } from "express";
import {
   signUp,
   signIn,
   updateUser,
   updateUserRole,
   getAllUsers,
   deleteUser,
   createUser,
   changeUserStatus,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/auth/signin", signIn);
router.post("/auth/register", signUp);
router.post("/create-user", createUser);
router.put("/user/:email", updateUser);
router.put("/user/role/:email", updateUserRole);
router.get("/users", getAllUsers);
router.delete("/user/:email", deleteUser);
router.patch("/user/:id/status", changeUserStatus);

export default router;
