const express = require("express")
const Router = express.Router()
const users = require("../Models/Users")
const Jwt = require("jsonwebtoken")
const Auth = require("../Models/Auth")
require("dotenv").config()



Router.post("/create", async (req, res) => {
const {firstname, lastname, gender, email, phone , useremail} = req.body

    if (!firstname || !lastname || !gender || !email || !phone ) {
        return res.json({ "msg": "All fields are mandatory" });
    }

    const checkUser = await users.findOne({ email })

    if (checkUser) {
        return res.json({ "msg": "User Already created with this email address" })
    }



    else {
        const useremails = req.cookies.Token

        const verifyToken = await Jwt.verify(useremails, process.env.SECRETE_KEY
            )
        const usersId = verifyToken.userId;

const getUsers = await Auth.findOne({_id:usersId});
const getuserEmail =  await getUsers.email
        const createUser = await users.create({
            firstname,
            lastname,
            email,
            gender,
            phone,
            useremail:getuserEmail
        });
         res.json({"msg":"User created successfully!"})
    }
})


Router.get("/getAllusers", async (req, res)=>{


    const userToken = req.cookies.Token

    const verifyToken = await Jwt.verify(userToken, process.env.SECRETE_KEY
        )
    const usersId = await verifyToken.userId;
    const getUsers = await Auth.findOne({_id:usersId});
    const getuserEmail =  await getUsers.email



    const getAlluser = await users.find({useremail:getuserEmail});


        return res.json(getAlluser)
    

    
})

// delete users

Router.delete("/delete/:id", async(req, res)=>{
    const UID = req.params.id;

    const deleteuser = await users.findByIdAndDelete({_id:UID});

    if(deleteuser){
        return res.json({"msg":"User deleted successfully!"})
    }

    else {
        return res.json({"msg":"Failed to delete an user"})
    }
})


// Get Signle user

Router.get("/getUser/:id", async(req, res)=>{
    const UID = req.params.id;

    const getSignleUser = await users.findOne({_id:UID});

    if(getSignleUser) {
        return res.json({getSignleUser})
    }

    else {
        res.json({"msg":"Failed to get user"})
    }
})

//Update user

Router.put("/update/:id", async(req, res)=>{
    const UID = req.params.id;

    const updateUser = await users.findByIdAndUpdate(UID, req.body);

    if (updateUser) {
        return res.json({updateUser})
    }
    else {
        return res.json({"msg":"Failed to update user details"})
    }
})



module.exports = Router