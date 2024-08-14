import User from "../models/user.js";
import Turf from "../models/turf.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET /api/users/:userId
export const getUser = async (req , res ) => {
  try {
    const {userId} = req.params;
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).send("User not found")
    }
    return res.status(200).send(user)

  }catch(error){
      return res.status(500).send(error.message)
  }
}


// POST  /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneno } = req.body;
    //Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      // hash password
      const salt = await bcrypt.genSalt();
      console.log({ password, salt });
      const hashPassword = await bcrypt.hash(password, salt);
      // create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        phoneno,
      });
      const savedUser = await newUser.save();
      return res.status(201).json({ message: "New user created", savedUser });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Post api/users/login
export const loginUser = async (req, res) => {
  console.log("Login function called");
  try {
    const { email, password } = req.body;

    // Find user and manager
    const user = await User.findOne({ email });
    const manager = await Turf.findOne({ email });
    console.log("hahah ",user)

    console.log({ email, password });

    // Check for user
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET);
        return res.status(200).json({ message: "Login successful", user, token });
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    }

    // Check for manager
    if (manager) {
      console.log("Manager password from DB:", manager.password);
      const isMatch = password === manager.password;
      console.log("Is password match for manager:", isMatch);
      if (isMatch) {
        // Create a JWT token
        const token = jwt.sign({ userId: manager._id }, process.env.SECRET);
        return res.status(200).json({ message: "Login successful", manager, token });
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    }

    // No user or manager found
    return res.status(404).json({ message: "Account not found" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" , message : error.message });
  }
};
  



// PUT /api/users/update/userId
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, mobile, phoneno , oldPassword } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);
    // const isMatch = await bcrypt.compare(oldPassword, user.password);
    // if(!isMatch) {
    //   return res.status(401).send("Wrong password")
    // }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the user properties
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (mobile) {
      user.mobile = mobile;
    }
    if (phoneno) {
      user.phoneno = phoneno;
    }
    // Save the updated user
    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUser = async (req , res ) => {
  try {

    const {userId} = req.params;
    const deleteUser = await User.findByIdAndDelete(userId)
    if(deleteUser){
      return res.status(200).send(deleteUser)
    }
    
  } catch (error) {
    return res.status(500).send(error.message)
  }
}