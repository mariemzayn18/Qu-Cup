import Jwt from "jsonwebtoken";
const SECRET_KEY = "NOTESAPI"

const adminAuth = (req,res, next)=>{
    try{
        const bearer = req.headers.authorization
        console.log(bearer);
        const token = bearer?.split(" ")[1];
        console.log(token);
        const payload  = Jwt.verify(token,SECRET_KEY)
        console.log(payload);
        
        if(payload.role != 1)
            throw new Error
        next()
    }
    catch(err){
    return res.status(401).json({error:"user isn't authorized"})
    }

}

const userAuth = (req,res, next)=>{
    try{
        const bearer = req.headers.authorization;
        const token = bearer?.split(" ")[0];
        const payload  = Jwt.decode(token)
        if(payload.role == 1)
            next()
    }
    catch(err){
    return res.status(401).json({error:"user isn't authorized"})
    }

}

export {adminAuth,userAuth}