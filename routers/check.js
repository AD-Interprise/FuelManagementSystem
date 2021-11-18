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
    console.log("user--------", user);

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
        res.render('selectPump',{pumps:result})
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

//User booking a pump  //http://localhost:3000/profile/:id
router.post("/booking/:pumpIndex", async (req, res) => {
  let userName = req.body.name;
  let pumpIndex = req.params.pumpIndex - 1;
  let foundUser = 0;
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", userName);

  //Getting all data from user Database
  User.find((err, result) => {
    if (!err) {
      result.forEach((e) => {
        // Chacking that user Exist in database
        if (e.name == userName) {
          foundUser = e;
        }
      });

      // If user Exist in database
      if (foundUser != 0) {
        //Finding nearest pumps accoridin to limit
        Pump.find({
          location: {
            $near: {
              $maxDistance: 100000,
              $geometry: {
                type: "Point",
                coordinates: [
                  foundUser.location.coordinates[0],
                  foundUser.location.coordinates[1],
                ],
              },
            },
          },
        })
          .limit(4) //setting limit for number of pumps
          .find((error, result1) => {
            if (error) {
              console.log(error);
              res.send(error);
            } else {
              //Creating Booking Database
              Booking.create({
                userID: foundUser._id,
                pumpID: result1[pumpIndex]._id,
              });
              console.log("Data saved in Bookings...............");
              res.send(result);
            }
          });
      } else {
        res.send("Error occuring..................");
        console.log("Error occuring....................");
      }
    } else {
      console.log("Error occuring....................");
    }
  });
});

module.exports = router;
