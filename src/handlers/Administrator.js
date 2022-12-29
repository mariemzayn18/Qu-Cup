import {userData} from '../models/User.js'

const handleApproveUser = async (req,res)=>{
    try{
        const {userId} = req.body
        const update = {approved:true}
        const updated= await userData.findByIdAndUpdate(userId, update,{new: true})
        console.log(updated)
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
        const userId = req.params.userid
        await userData.findByIdAndDelete(userId)
        res.status(200).send({message:"Success"})
    }catch(err){
        res.status(401).send({message: "cann't delete user"})
    }
}


export { handleApproveUser, handlegetAllUser, handleDeleteUser}