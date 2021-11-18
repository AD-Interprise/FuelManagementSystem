const router = require("express").Router();
const User = require("../model/user");
const Pump = require("../model/pump");
const Booking = require("../model/booking");

//99999999999999999999999999999

//99999999999999999999999999

//geting new user request
router.get("/", async (req, res) => {
  try {
    //creating new user from form data and save in data base
    console.log("req.body")
    console.log(req.query.name)
    console.log("req.body")
    const user = await User.create(req.query);
    console.log("user--------");

    //Finding pumps near User from pump Database
    await Pump.find({
      location: {
        $near: {
          $maxDistance: 100000,
          $geometry: {
            type: "Point",
            coordinates: [
              user.location.coordinates[0],
              user.location.coordinates[1],
            ],
          },
        },
      },
    })
      .limit(4)
      .find((error, result) => {
        if (error) console.log(error);
        //res.send(result);
        res.render('selectPump',{pumps:result,user:user._id})
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

//User booking a pump  //http://localhost:3000/profile/:id
router.get("/booking/:userId/:pumpId", async (req, res) => {
  console.log('-------');
  console.log('param',req.params);
  console.log('dddddd',req.query);
  let userId = req.params.userId;
  let pumpId = req.params.pumpId;
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", userId,'rrrrrrrrrr',pumpId);
    if(userId&&pumpId){
      //Creating Booking Database
     let booking= await  Booking.create({
        userID: userId,
        pumpID: pumpId,
      });
      console.log("Data saved in Bookings...............");
      res.send(booking);
    } else {
      console.log("Error occuring....................");
    }
  
});

module.exports = router;
