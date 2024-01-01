const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const {AuthModel}= require("../model/auth.model")
const {Router} = require("express");
const userController = Router();

userController.post("/signup",(req,res)=>{
    const {name,email,phone,password} = req.body;

    bcrypt.hash(password, 10, async function(err, hash) {
    if(err){
        res.send(err)
    }

    const user = new AuthModel({
        name,
        email,
        phone,
        password: hash
    });

    try {
        await user.save();
        res.send("Signup Sucessfull")
    } catch (error) {
        console.log(error);
        res.send("Signup Failed")
    }
    });

    userController.post("/login",async (req,res)=>{
        const{email,password}=req.body;

        const user = await AuthModel.findOne({email});
        const hash = user.password;

        bcrypt.compare(password, hash, function(err, result) {
          if(err){
            res.send(err)
          }

          if(result){
            const token = jwt.sign({userID: user._id }, 'shhhhh');
            res.send({message: "Login Successfull",token: token})
          }
          else{
            res.send("invalid")
          }
        })

    })
})
module.exports={
    userController
}