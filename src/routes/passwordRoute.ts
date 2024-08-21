import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  addPassword,
  deletePassword,
  getPassword,
  getPasswords,
  updatePassword,
} from "../controllers/passwordController";

const route = express.Router();

// add new password
route.post("/", verifyToken, addPassword);

// get all passwords
route.get("/", verifyToken, getPasswords);

// get password
route.get("/:id", verifyToken, getPassword);

// delete password
route.delete("/:id", verifyToken, deletePassword);

// upate password
route.put("/:id", verifyToken, updatePassword);

export default route;
