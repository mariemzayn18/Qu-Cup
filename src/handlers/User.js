import {userData} from '../models/User.js'
import bcrypt from "bcryptjs"
import Jwt from 'jsonwebtoken'

const SECRET_KEY = "NOTESAPI"
const handleLogin = async (req,res) => { 

    try{
        const {username, password} = req.body
        const logged_user = await userData.loginCheck(username, password)
        const user_id = logged_user._id.valueOf()
        const token = Jwt.sign({id : user_id,role:logged_user.role},SECRET_KEY)
        res.status(200).send({user: logged_user,token: token, error: false})
    }
    catch(err){
        res.status(400).send({ message: err.message, error: true})
    }
}

const handleUserSignUp = async (req,res) => {    
    try{
        console.log("GGGGGGGGGGg")
        console.log(req.body)
        const register_user = new userData({
        userName: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        nationality: req.body.nationality,
        email: req.body.email,
        address: req.body.address,
        role: req.body.role,
        approved:false
        })
        console.log("before")
    const user_id = await register_user.save().then(saved=>{
        console.log("in")
        return saved._id.valueOf()
    })
    console.log("after")
    const token = Jwt.sign({id : user_id, role: register_user.role}, SECRET_KEY)
    res.status(200).send({user: register_user,token: token, error: false})
    }catch (err){
        res.status(400).send({ message: err.message, error: true})
    }
}

const handleUpdateData  = async(req,res) =>{
    try{
        const bearer = req.headers.authorization;
        const token = bearer?.split(" ")[1];
        const payload  = Jwt.decode(token)
        const userId = payload.id
        let update = { ...req.body }
        console.log(req.body)

        Object.keys(update).forEach((k) => update[k] == '' && delete update[k]);
        
        if(update.password != null) {
            update.password = await bcrypt.hash(update.password, 12);
        }
        const updated = await userData.findByIdAndUpdate(userId,update,{new:true})
        return res.status(200).json({user: updated});
    }catch(error){
        res.status(400).send({message: error.message})
    }
}


export { handleUserSignUp, handleLogin ,handleUpdateData}