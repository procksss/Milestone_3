const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'pratyushisagoodb$oy';

// ROUTE 1: Create a User using: POST "/api/auth/createUser". No login required
router.post('/createUser', [
  body('firstname', 'Enter a valid name').isLength({ min: 3 }),
  body('lastname', 'Enter a valid name').isLength({ min: 3 }),
  body('address', 'Enter a valid string'),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  body('Isadmin', 'enter true or false'),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success=false;
    return res.status(400).json({ success,errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await  User.findOne({ email: req.body.email });
    if (user) {
      success= false;
      return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      password: secPass,
      email: req.body.email,
      Isadmin : req.body.Isadmin
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    success=true;

    // res.json(user)
    res.json({ success,authtoken })

  } catch (error) {
    success=false;
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/loginUser". No login required
router.post('/loginUser', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
        firstname: user.firstname,
        Isadmin : user.Isadmin
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken,data })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});

//get all data
router.get("/getalldata", fetchuser, async (req, res) => {
    try {
      // Check whether the user with this email exists already
      let allusers =  await User.find()
      res.json( allusers );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


  //update data
  router.put("/updateuser/:id", fetchuser, async (req, res) => {
    const{firstname,
      lastname,
      address,
      email,
      Isadmin}=req.body
   const updateuser = {};
    if(firstname)(updateuser.firstname=firstname);
    if(lastname)(updateuser.lastname=lastname);
    if(address)(updateuser.address=address);
    if(email)(updateuser.email=email);
    if(Isadmin)(updateuser.Isadmin=Isadmin)

    try {
      // Check whether the user with this email exists already
      let user =  await User.findById(req.params.id )
      if(!user){
        res.status(404).send("user not found")
      }
      user = await User.findByIdAndUpdate(user.id, {$set:updateuser}, {new:true})
      res.json({ user });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


  //delete

  router.delete(
    "/deleteuser/:id",
    fetchuser,
    async (req, res) => {
      try {
        let user = await User.findById(req.params.id)
        if(!user){
          res.status(404).send("user not found")
        }

      user = await User.findByIdAndDelete(user.id)
      res.json({"success" : "The note was deleted", user: user});


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports=router;