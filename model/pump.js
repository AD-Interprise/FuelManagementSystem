const mongoose = require("mongoose");
const geocoder=require('../utls/geocoder')


//creatin schema for Pumps
const pumpSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,'Plese Enter name of pump'],
    unique:true
  },
  typeOfFuel: {
    type: String,
    // required:[true,'please enter fuel type']
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
      createIndexes:'2dsphere'
      
    },
    formattedAddress:String
  },
  createdAt:{
    type:Date,
    default:Date.now

  }
  
});
//Geocode & create location
pumpSchema.pre('save', async function(next){
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

module.exports = mongoose.model("pump", pumpSchema);

