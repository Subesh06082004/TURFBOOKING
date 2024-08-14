import express from "express";
import { registerUser , loginUser , updateUser , getUser , deleteUser } from "../controllers/userController.js";
import Auth from "../middleware/authMiddleware.js";

const router = express.Router();

//  GET /api/users/:userID
//  get user info
router.get('/:userId' , getUser )

//  POST /api/users/register  
//  register user
router.post("/register", registerUser );

//  POST /api/users/login  
//  login user
router.post("/login", loginUser );

//  PUT /api/users/update/:userId  
//  Update user info
router.put("/update/:userId",  updateUser );

//  Delete /api/users/delete/:userId  
//  Update user info
router.delete("/delete/user/:userId", deleteUser );

export default router