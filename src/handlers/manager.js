import {Match} from '../models/Match.js'
import {Stadium} from '../models/Stadium.js'


const addMatch =  async (req, res) => {
    try {
        console.log("add match")
        console.log(req.body)
        // if (!req.user.role)
        //     throw new Error('User does not have manager credentials');
        await Match.find({teamOne :req.body.team1, date: req.body.date},async(err,docs)=>{
            if(docs)
            throw new Error('team one has match in this date');
            else {
                await  Match.find({teamOne : req.body.team2, date: req.body.date },async(err,docs)=>{
                    if(docs)
                     throw new Error('team one has match in this date');
                     else {
                        await  Match.find({teamTwo : req.body.team1, date: req.body.date },async(err,docs)=>{
                            if(docs)
                             throw new Error('team one has match in this date');
                             else {
                                await  Match.find({teamTwo : req.body.team2, date: req.body.date },async(err,docs)=>{
                                    if(docs)
                                     throw new Error('team one has match in this date');

                                })

                             }

                        })

                     }

                })
            }

        })
        const match = new Match(req.body);

        const stadium = await Stadium.findById(match.matchVenue)


        const vipRow = stadium.VIPRows
        const vipSPerR = stadium.VIPSeatsPerRow

        const standardRow = stadium.standardRows
        const standardCol = stadium.standardSeatsPerRow


        const standardSeats =
        Array.from({ length: standardRow }, () =>
        Array.from({ length: standardCol }, () => false));

        const VIPSeats =
        Array.from({ length: vipRow }, () =>
        Array.from({ length: vipSPerR }, () => false));

        match.set('normal_seats', standardSeats)
        match.set('seats', VIPSeats)



        await match.save();
        res.status(201).json({match : match});
    }
    catch(error) {
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

        return res.status(200).json({VIPSeats: match.VIPSeats , standardSeats :match.standardSeats});
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
