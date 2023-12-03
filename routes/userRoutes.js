const express = require("express");
const router = express.Router();
const User = require("../models/User")

router.post("/register",async (req,res)=>{
    console.log("req",req.body)
    const {email,password} = req.body
    try{
        const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new User({email, password });
    const user = await newUser.save();
    res
    .status(201)
      .json({ message: "Registration Success" });
    console.log(user);
    }catch(err){
        console.log("Error",err)
    res.status(500).json({ message: "Server error" });
    }
})

router.post("/login",async(req,res)=>{
  const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        if(password == user.password){
        res.status(200)
          .json({
            message: "Login success",
            user,
          })
        }
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
})


module.exports = router