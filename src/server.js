import express from "express"
import bodyParser from "body-parser"

import userRouter from "./routes/User.js"
import managerRouter from './routers/manager.js'
import fanRouter from './routers/fan.js'
import cors from "cors"

const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors({origin:"http://localhost:3000" , methods: [
 'GET','POST','DELETE','PUT'
]})) // Use this after the variable declaration

const PORT = 8888
app.listen(PORT, () =>{
    console.log("server started at port 8888")
}) 

app.use("/users", userRouter)
app.use('/manager',managerRouter)
app.use('/fan',fanRouter)



app.get("/test",(req,res)=>{
    res.json({message: "hello"})
})
app.post("/test-post",(req,res)=>{
    console.log(req.body)
    res.json({message: `hello ${req.body.name}`})
})



