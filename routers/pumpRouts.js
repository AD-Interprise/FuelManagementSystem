const router = require("express").Router();
const Pump = require("../model/pump");
const User = require("../model/user");
const Booking = require("../model/booking");

//fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
//find user in database
router.get("/pump", async (req, res) => {
  //res.render('selectPump')
  res.render('index')

});

//ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

// Gatting new pump request
router.post("/", async (req, res) => {
  var users = [];
  try { // Pump exist in database
    //Get all booking data
    const booked = await Booking.find();
    //Getting Pump details of pump given by user from Database
    await Pump.findOne({ name: req.body.name }).then((result) => {
      //getting all user ID's that booked given pump
      if (result) {
        booked.forEach((e) => {
          if (e.pumpID == result._id) {
            users.push(e.userID);
          }
        });
      }
      else {
        //Pump not exist
        try {
          //creating new user from form data and save in data base
          const pump = Pump.create(req.body);

          return res.status(200).send(`Welcome! ${req.body.name}`);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "server error" });
        }
        
      }

    });

    var users1 = [];

    //Getting all user from database
    let userData = await User.find();

    users.forEach((e) => {
      userData.forEach((element) => {
        if (e == element._id) {
          users1.push(element);
        }
      });
    });
    // Sending response back to pumps
    if(!users1.length)
    res.send("No bookings done here")
    res.send(users1);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
