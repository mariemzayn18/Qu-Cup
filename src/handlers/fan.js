const Match = require('../models/Match.js')

const getAllMatches  = async(req,res) =>{
    try{
        const matchs = await Match.find()
        if(!matchs)
           throw new Error('No matchs to display');
        return res.status(200).json({match: matchs});
    }catch(error){
        res.status(400).send({message: error.message})
    }
}
module.exports = {
    getAllMatches
}