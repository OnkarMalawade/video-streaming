//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
//import express from "express"
import {app} from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({
    path : './env'
})

connectDB()
.then(() => {
    app.on("error",() => {
        console.error("Error : ", error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at PORT : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB Error : ", err);
})

/*
import express from "express"
const app = express()
//function connectDB(){
//
//}
;( async () => {
    try {
        await mangoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",() => {
            console.error("Error : ", error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("Error : " ,error)
        throw error
    }
})()

*/