import express from "express"
import bodyParser from "body-parser"
import userRouter from "./routes/User.js";
const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.use("/users", userRouter)


const PORT = 3000
app.get("/test",(req,res)=>{
    res.json({message: "hello"})
})

app.post("/test-post",(req,res)=>{
    console.log(req.body)
    res.json({message: `hello ${req.body.name}`})
})


app.listen(PORT, () =>{
    console.log("server started at port 3000")

})