const express = require("express");
const { userController} = require("./Routes/auth.route");
const {connection }= require("./config/db")
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("BASED API ENDPOINT")
})



app.use("/",userController)

app.listen(PORT,async()=>{
    try {
        await connection
        console.log("db is connect to server");
    } catch (error) {
        console.log(error)
    }

    console.log(`server is running`);
})
