import express from "express";
import{createPassword,getAllPasswords,updatePassword,deletePassword} from "../controller/passwordController.js";

const route=express.Router();

route.get("/getall",getAllPasswords);
route.post("/create",createPassword);
route.put("/update/:id",updatePassword);
route.delete("/delete/:id",deletePassword);

export default route;
