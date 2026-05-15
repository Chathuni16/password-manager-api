import express from "express";
import { createPassword, getOne, getAllPasswords, updatePassword, deletePassword } from "../controller/passwordController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/create", authMiddleware, createPassword);
route.get("/getall", authMiddleware, getAllPasswords);
route.get("/getone/:id", authMiddleware, getOne);
route.put("/update/:id", authMiddleware, updatePassword);
route.delete("/delete/:id", authMiddleware, deletePassword);

export default route;