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

const handlegetAllFans = async (req,res)=>{
    try{
        const filter = {approved: true, role:"fan"}
        const allUsers= await userData.find(filter)
        const filter2 = {approved: true, role:"manager"}
        const allUManagers= await userData.find(filter2)
        // concat all users and managers
        const allUsersAndManagers = allUsers.concat(allUManagers)
        res.status(200).json({users: allUsersAndManagers})
    }catch(err){
        res.status(401).send({message: "cann't approve user"})
    }
}

const handlegetAllManagers = async (req,res)=>{
    try{
        const filter = {approved: true, role:"manager"}
        const allUsers= await userData.find(filter)
        res.status(200).json({users: allUsers})
    }catch(err){
        res.status(401).send({message: "cann't approve user"})
    }
}


const handlegetAllRequests = async (req,res)=>{
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


export { handleApproveUser, handlegetAllFans, handleDeleteUser, handlegetAllRequests, handlegetAllManagers}