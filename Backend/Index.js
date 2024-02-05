const express= require("express");
const app = express();
require("./Coonection")
const AuthController = require("./Controllers/Auth");
const Usercontroller = require("./Controllers/Users");
const cookiparser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()


app.use(express.json())
app.use(cookiparser())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials : true
}))

const PORT = 5001;

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
});

app.use("/Auth", AuthController);
app.use("/Users", Usercontroller)