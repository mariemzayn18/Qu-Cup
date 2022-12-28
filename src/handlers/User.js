import {userData} from '../models/User.js'
import Jwt from 'jsonwebtoken'

const SECRET_KEY = "NOTESAPI"
const handleLogin = async (req,res) => { 
    const {username, password} = req.body
    try{
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
        const register_user = new userData({
        userName: req.body.userName,
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
    const user_id = await register_user.save().then(saved=>{
        return saved._id.valueOf()
    })
    const token = Jwt.sign({id : user_id, role: register_user.role}, SECRET_KEY)
    res.status(200).send({user: register_user,token: token, error: false})
    }catch (err){
        res.status(400).send({ message: err.message, error: true})
    }
}

const handleApproveUser = async (req,res)=>{
    try{
        const {userId} = req.body
        const update = {approved:true}
        const updated= await userData.findByIdAndUpdate(userId, update)
        res.status(200).json({user:updated})
    }catch(err){
        res.status(401).send({message: "cann't approve user"})
    }
}

const handlegetAllUser = async (req,res)=>{
    try{
        const filter = {approved: false}
        const allUsers= await userData.find(filter)
        
        res.status(200).json({users: allUsers})
    }catch(err){
        res.status(401).send({message: "cann't approve user"})
    }
}

const handleDeleteUser = async (req,res)=>{
    try{
        const filter = {id: req.params.userid}
        console.log(filter, req.params);
        await userData.deleteOne(filter)
        res.status(200).send({message:"Success"})
    }catch(err){
        res.status(401).send({message: "cann't approve user"})
    }
}


export { handleUserSignUp, handleLogin ,handleApproveUser, handlegetAllUser, handleDeleteUser}