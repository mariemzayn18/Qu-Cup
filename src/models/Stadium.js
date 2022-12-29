import {mongoose} from 'mongoose'
import {Match} from './Match.js'

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
    }
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
export  {Stadium}
