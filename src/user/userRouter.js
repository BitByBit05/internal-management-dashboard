import ctrl from "./userController.js";
import express from "express";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({
    register: "/register",
    login: "/login",
  });
});

userRouter.post("/register", ctrl.registerUser);

export default userRouter;
