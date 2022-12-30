import {Match} from '../models/Match.js'
import {Stadium} from '../models/Stadium.js'


const addMatch =  async (req, res) => {
    console.log("ay 7aggggggg")
    console.log(req.body)
    try {
        console.log("add match")
        console.log(req.body)
        // if (!req.user.role)
        //     throw new Error('User does not have manager credentials');
        await Match.find({teamOne :req.body.teamOne, date: req.body.date},async(err,docs)=>{
            console.log("docs")
            console.log(docs)
            if(docs.length != 0)
            throw new Error('team one has match in this date');
            else {
                await  Match.find({teamOne : req.body.teamTwo, date: req.body.date },async(err,docs)=>{
                    if(docs.length != 0)
                     throw new Error('team 1 has match in this date');
                     else {
                        await  Match.find({teamTwo : req.body.teamOne, date: req.body.date },async(err,docs)=>{
                            if(docs.length != 0)
                             throw new Error('team two has match in this date');
                             else {
                                await  Match.find({teamTwo : req.body.teamTwo, date: req.body.date },async(err,docs)=>{
                                    if(docs.length != 0)
                                     throw new Error('team 2 has match in this date');

                                }).clone()

                             }

                        }).clone()

                     }

                }).clone()
            }

        }).clone()

        const match = new Match(req.body);
        console.log("Gggggggggggggggggggg")
        console.log( match.matchVenue)
        const stadium = await Stadium.find({name: match.matchVenue})
        console.log(stadium)

        const vipRow = stadium[0].VIPRows
        const vipSPerR = stadium[0].VIPSeatsPerRow

        const VIPSeats =
        Array.from({ length: vipRow * vipSPerR},() => false);
        console.log(VIPSeats)
        match.set('seats', VIPSeats)
        console.log(match)

        await match.save();
        console.log("saved?")
        res.status(201).json({match : match});
    }
    catch(error) {
        console.log("errrrrrrrrrrrrrrrrrrr")
        console.log(error)
        res.status(401).send({message: error.message});
    }
}

const addStadium = async (req, res) => {
    console.log("adddddd ")
console.log(req.body)

    try {
        console.log("add stadium")
        console.log(req.body)
        // if (!req.user.role)
        //     throw new Error('User does not have manager credentials');
        const stadium = new Stadium(req.body);
        await stadium.save();
        res.status(201).json({stadium: stadium});
    }
    catch(error) {
        console.log(error)
        res.status(401).send({message: error.message});
    }
}

const editMatch = async (req, res) => {
    try {
        // if (!req.user.role)
        //     throw new Error('User does not have manager credentials');
        const match = await Match.findById(req.params.matchID);
        if (!match)
            throw new Error('No match was found with this id');
        const updatedMatch = await Match.findOneAndUpdate({_id: req.params.matchID}, req.body, {new: true});
        res.status(200).json({match: updatedMatch});
    }
    catch(error) {
        res.status(400).send({message: error.message})
    }
}

const getMatch = async (req,res) =>{
    try{
        const match = await Match.findById(req.params.matchID);
        if(!match)
           throw new Error('No match was found with this id');
        return res.status(200).json({match: match});
    }catch(error){
        res.status(400).send({message: error.message})
    }
}

const viewVacantResSeats = async (req,res) =>{
    try{
        const match = await Match.findById(req.params.matchID);
        if(!match)
           throw new Error('No match was found with this id');

        return res.status(200).json({VIPSeats: match.seats});
    }catch(error){
        res.status(400).send({message: error.message})
    }
}

export {
    addMatch,
    addStadium,
    editMatch,
    getMatch,
    viewVacantResSeats
}
