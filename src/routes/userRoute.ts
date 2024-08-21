import express from "express";

import {
  signInUser,
  signUpUser,
  refreshToken,
} from "../controllers/userController";

const route = express.Router();

// register user
route.post("/sign-up", signUpUser);

// login user
route.post("/sign-in", signInUser);

// refresh token
route.post("/refresh", refreshToken);

export default route;
