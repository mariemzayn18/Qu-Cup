const mongoose = require('mongoose')
const Match = require('./Match')

const stadiumSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    VIPRows : {
        type : Number,
        required : true
    },
    VIPSeatsPerRow : {
        type : Number,
        required : true
    },
    standardRows : {
        type : Number,
        required : false
    },
    standardSeatsPerRow : {
        type : Number,
        required : true
    },
})

stadiumSchema.virtual('matches', {
    ref : 'Match',
    localField : '_id',
    foreignField : 'matchVenue' 
 })

 stadiumSchema.pre('remove', async (next) => {
     const stadium = this
     await Match.deleteMany({matchVenue : stadium._id})
     next()
 })

const Stadium = mongoose.model('Stadium', stadiumSchema)
module.exports = Stadium