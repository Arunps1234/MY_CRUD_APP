const mongoose = require("mongoose")

const userAuth = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },

    lastname : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    phonenumber : {
        type : Number,
        required : true
    },

    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Auth", userAuth)