import express from "express";
import { userController } from "../controllers/index.js";

const router = express.Router();

router.get("/", userController.getAllUser);

router.delete("/delete/:id", userController.deleteUser);

router.post("/login", userController.login);

router.post("/register", userController.register);

router.post("/refresh", userController.requestRefreshToken);

router.post("/logout", userController.logOut);

// router.post("/post", userController.postBlog);

export default router;
