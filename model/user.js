const mongoose = require("mongoose");
const geocoder=require('../utls/geocoder')


//creating schema for users
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,'Plese Enter your name'],
  },

  typeOfFuel: {
    type: String,
    required:[true,'please enter fuel type']
  },
  address:{
    type:String,
    required:true
  },

  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      
    },
    coordinates: {
      type: [Number],
      creteIndexes:'2dsphere'
      
    },
    formattedAddress:String
  },
  createdAt:{
    type:Date,
    default:Date.now

  }
});

//Geocode & create location
userSchema.pre('save', async function(next){
  
  const loc= await geocoder.geocode(this.address)
  this.location={
    type:'Point',
    coordinates:[loc[0].longitude,loc[0].latitude],
    formattedAddress:loc[0].formattedAddress
  }
  console.log(loc);
  // do not save address
 // this.address=undefined;
  next()
})

module.exports = mongoose.model("user", userSchema);
