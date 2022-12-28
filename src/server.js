import express from "express"
import bodyParser from "body-parser"
import userRouter from "./routes/User.js"
import managerRouter from './routers/manager.js'
import fanRouter from './routers/fan.js'
const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use("/users", userRouter)
app.use('/manager',managerRouter)
app.use('/fan',fanRouter)


const PORT = 4000
app.get("/test",(req,res)=>{
    res.json({message: "hello"})
})

app.post("/test-post",(req,res)=>{
    console.log(req.body)
    res.json({message: `hello ${req.body.name}`})
})


app.listen(PORT, () =>{
    console.log("server started at port 4000")

})
