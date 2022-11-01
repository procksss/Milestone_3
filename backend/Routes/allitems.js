const express = require("express");
const Items = require("../Models/Allitems")
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

// ROUTE 1: get all items  using: GET "api/allitems/getallitems".
router.get("/getallitems", fetchuser, async (req, res) => {
    try {
      let allitems =  await Items.find()
      res.json( allitems );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

// ROUTE 2: add a new items  using: GET "api/allitems/additem".
router.post(
  "/additem",
  fetchuser,
  [
    body("medicineid", "Enter valid id"),
    body("price", "Enter valid price"),
    body("medicinename", "Enter valid number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{medicineid, price, medicinename}=req.body
    try {
        let user =  await User.findById(req.user.id )
        if(!user.Isadmin){
          res.status(404).send("you are not admin")
        }
      // Check whether the user with this email exists already
      const items = new Items (
        {
          medicineid, medicinename,price
        }
      )
      const saveitem = await items.save()
      res.json({ saveitem });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 3: update items from User using: PUT "api/items/updateitem/:id".
router.put(
  "/updateitem/:id",
  fetchuser,
  async (req, res) => {
    const{medicineid, price, medicinename,tag}=req.body
   const updateitem = {};
    if(medicineid)(updateitem.medicineid=medicineid);
    if(medicinename)(updateitem.medicinename=medicinename);
    if(tag)(updateitem.tag=tag);
    if(price)(updateitem.price=price);
    try {
        let user =  await User.findById(req.user.id )
        if(!user.Isadmin){
          res.status(404).send("you are not admin")
        }
      let item = await Items.findById(req.params.id)
      if(!item){
        res.status(404).send("item not found")

      }
     item = await Items.findByIdAndUpdate(item.id, {$set:updateitem}, {new:true})

      res.json({ item });


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// ROUTE 4: delete items from User using: DELETE "api/items/deleteitems/:id".
router.delete(
  "/deleteitem/:id",
  fetchuser,
  async (req, res) => {
    try {
        let user =  await User.findById(req.user.id )
        if(!user.Isadmin){
          res.status(404).send("you are not admin")
        }
      let item = await Items.findById(req.params.id)
      if(!item){
        res.status(404).send("item not found")

      }
      item = await Items.findByIdAndDelete(item.id)
      res.json({"success" : "The item was deleted", item: item});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
