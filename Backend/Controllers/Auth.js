const express = require("express")
const Router = express.Router()
const Auth = require("../Models/Auth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()



Router.post("/register", async(req, res)=>{
const {firstname, lastname, email, phonenumber, password} = req.body;


if(!firstname || !lastname || !email || ! phonenumber || !password){
    return res.json({"msg":"All fields are mandatory"})
}

const checkExtingUser = await Auth.findOne({email});

if (checkExtingUser) {
    return res.status(400).json({"msg":"User Already registered with this email address, please try with some other email"})
}

else {
    const hashpassword = await bcrypt.hash(password, 10)
    const createUser = await Auth.create({
        firstname,
        lastname,
        email,
        phonenumber,
        password:hashpassword
    });

    if (createUser) {
        return res.status(201).json({"msg":"User registered successfully with this emaill address"})
    }

    else {
        return res.json({"msg":"Failed to create an account, please try again later"})
    }
}
})

Router.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({"msg" : "All fields are mandatory"})
    }

    const checkUser = await Auth.findOne({email});

    if (checkUser && await (bcrypt.compare(password, checkUser.password))){
        const token = jwt.sign({
            userId : checkUser._id
        }, 
        process.env.SECRETE_KEY
        )
        return res.status(200).cookie("Token", token).json({"msg":"User logged in successfully!"})
    }

    else {
        return res.status(400).json({"msg":"Invalid email address or password"}) 
    }
})


module.exports= Router