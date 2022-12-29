
import mongoose from "mongoose";

const reservationShema = mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    match : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Match'
    },
    seatRow : {
        type : Array,
        required : true
    },
    seatCol : {
        type : Array,
        required : true
    },
    seats : {
        type :Array,
        required : false
    }
},{
    strict : false,
    timestamps : true
})
//reservationShema.index({match : 1, owner : 1}, {unique : true})
const Reservation = mongoose.model('Reservation', reservationShema)
Reservation.syncIndexes();
export default Reservation