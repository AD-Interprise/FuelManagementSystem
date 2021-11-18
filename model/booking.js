const mongoose=require('mongoose');


//Creating schema for Bookings


const bookingSchema= new mongoose.Schema({
    userID:{
        type:String,
        required:[true,'Error is occuring in booking']
    },
    pumpID:{
        type:String,
        required:[true,'Error is occuring in booking']
    }
})
module.exports=mongoose.model("booking", bookingSchema)