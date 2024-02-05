const mongoose = require("mongoose");
require("dotenv").config()

mongoose.connect(process.env.MDB_URL).then(res=>{
    console.log("Connected to database successfully")
}).catch(err=>{
    console.log(err)
})