import express from "express";
import * as UsersController from "../controllers/UserController";

const router = express.Router();

router.get("/", UsersController.getAuthenticatedUser);

router.post("/signup", UsersController.signUp);

router.post("/login", UsersController.login);

router.post("/logout", UsersController.logout);

router.post("/change", UsersController.changePassword);

router.post("/delete", UsersController.deleteUser);

export default router;
