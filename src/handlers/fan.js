import {Match} from '../models/Match.js'
import { Reservation } from '../models/Reservation.js';
import mongoose from 'mongoose';

const getAllMatches  = async(req,res) =>{
    try{
        const matchs = await Match.find()
        if(!matchs)
          return res.status(400).send('No matchs to display');
        return res.status(200).json({match: matchs});
    }catch(error){
        res.status(400).send({message: error.message})
    }
}

const reserveMatch = async(req,res)=>{
  // check if its from a valid user when do this chanch req.body.owner
  // body {
  //   match: matchid
  //   owner: userid
  //   seats:[{row: , col: }]
  // }
  var matchid = new mongoose.Types.ObjectId(req.body.match)

  try{
    console.log(req.body.seats)
    for( var i =0; i<req.body.seats.length; i++)
    {
      const seat = req.body.seats[i]
      // const c = req.body.seats[i].col
      var slot = {}
      var seats = `seats.${seat}`.toString()
      // console.log(vipSeats)
      var q = {}
      q["_id"]=matchid
      q[seats]=false

      var update ={}
      update[seats]=true

      var slot = await Match.findOneAndUpdate(q, {$set: update}, { useFindAndModify: false})
      if(!slot){
        return res.status(400).send('Seat is not available,Please choose another one')
      }
    }
    const reservation = await new Reservation()
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const hashCode = function(s){
      return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }

    const ticketNumber = Math.abs(hashCode(timestamp.toString()+(req.body.owner).toString()))
    reservation.set('match', matchid)
    reservation.set('ticketNumber', ticketNumber)
    reservation.set('seats', req.body.seats)
    reservation.set('owner',req.body.owner)

    await reservation.save()
    return res.status(200).json({Reservation: reservation });
  }
  catch(e){
    res.status(400).send({error :true , message: e.message})
  }
}
const getAllUserReservations = async(req,res)=>{
  try{
    // this id should get from the login user not from the body
    allResponseData =[]
    allRes = Reservation.find({"owner": req.body._id})
    for(var i = 0 ;i<allRes.length;i++)
    {
      var match  = Match.find({"_id":allRes[i].match})
      var reserve = JSON.parse(JSON.stringify(allRes[i]))
      reserve.match = match
      allResponseData.push(reserve)
    }
    // return all reservation data with all data about the match of this vreservatioms
    return res.status(200).json(allResponseData);
  }catch(error){
    res.status(400).send({error :true , message: e.message})
  }
}

const cancelReservation = async(req,res) =>{
  try{
    // body {
    //   _id : id of the reservation
    // }
    var reservation = await Reservation.find({"_id":req.body._id})
    console.log(reservation)
    var matchid = new mongoose.Types.ObjectId(reservation.match)
    if(reservation.length == 0) throw new Error('There is no reservation with this id')

    // before cancelation check if it is before 3 days from the match or not
    var cancelDate = new Date()
    // console.log(cancelDate)
    var match  = Match.find({"_id":matchid})
    var matchDate = new Date(match[0].date)
    // console.log(matchDate)
    dayNum = (matchDate-cancelDate)/(60 * 60 * 24 * 1000)
    console.log('dayNum: '+ dayNum)

    //date check
    if(dayNum<3) res.status(400).send({msg:'Cant be canceled'})

    // loop for all reservation to free the seats
    for( var i =0; i<reservation.seats.length; i++)
    {
      const seat = reservation.seats[i]
      var slot = {}
      var seats = `seats.${seat}`.toString()
      // console.log(vipSeats)
      var q = {}
      q["_id"]=matchid

      var update ={}
      update[seats]=false

      var slot = await Match.findOneAndUpdate(q, {$set: update}, { useFindAndModify: false})
      if(!slot) throw Error("Failed to free slots")

      //delete reservation
      await Reservation.deleteOne({"_id":id})
      return res.status(200).send({msg:"Successfully deleted"})
    }

  }catch(error){
    console.log(error)
    res.status(400).send({error :true , message: e.message})
  }

}


export {
    getAllMatches,
    reserveMatch,
    getAllUserReservations,
    cancelReservation
}

