const mongoose = require("mongoose");
const geocoder=require('../utls/geocoder')


//creatin schama for Pumps
const pumpSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,'Plese Enter name of pump'],
    unique:true
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
    type: { type: String },
    coordinates: []
  },
  createdAt:{
    type:Date,
    default:Date.now

  }
  
});
pumpSchema.index({ location: "2dsphere" });

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


//getting booking bd  //http://localhost:3000/profile/:id
router.post('/booking',async(req,res)=>{
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    let userName=req.body.name;
    let foundUser
    let tempUser= User.find((err,result)=>{
      console.log('ffffffffffffffff');
      result.forEach(e=>{
        if(e.name==userName){
          foundUser=e
                  }          
      })
      
      console.log(foundUser);
      console.log('tttttttttttttttttt');
      
  
    })
    //const booking= await Booking.create(req.body);
    console.log(tempUser);
    
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  
    // await Pump.find( {
         
    //   location: {
    //    $near: {
    //     $maxDistance: 100000,
    //     $geometry: {
    //      type: "Point",
    //      coordinates: [76.72086,30.71137]
    //     }
    //    }
    //   }
    //  }).limit(4).find((error, result) => {
    //   if (error) console.log(error);
    //   else{
        
      
    //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    //     console.log('result---------', result);
    //     console.log('check', result['${id}']);
    //   }
  
    //   res.send(result)
    // })
    
  })