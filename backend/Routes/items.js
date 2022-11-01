const express = require("express");
const Items = require("../Models/Items")
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

// ROUTE 1: get all items from User using: GET "api/items/getallitems".
router.get("/getallitems", fetchuser, async (req, res) => {
  try {
    // Check whether the user with this email exists already
    let items = await Items.find( {user: req.user.id });
    if (!items) {
      return res
        .status(400)
        .json({ error: "Sorry the item is not available" });
    }
    res.json( items );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: add a new items from User using: GET "api/items/additem".
router.post(
  "/additem",
  fetchuser,
  [
    body("medicinename", "Enter valid name"),
    body("price", "Enter valid price"),
    body("medicineid", "Enter valid number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{medicineid, price, medicinename,tag}=req.body
    try {
      // Check whether the user with this email exists already
      const items = new Items (
        {
          medicineid, price, medicinename,tag, user : req.user.id
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
// ROUTE 3: update items from User using: GET "api/items/updateitem/:id".
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
      let item = await Items.findById(req.params.id)
      if(!item){
        res.status(404).send("item not found")

      }
      // const user = await Items.findOne({user : req.params.id}) this can be easily hacked 

      if(req.user.id !== (item.user).toString()){
        res.status(401).send("Not allowed")
      }

      item = await Items.findByIdAndUpdate(item.id, {$set:updateitem}, {new:true})

      res.json({ item });


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// ROUTE 4: delete items from User using: GET "api/items/deleteitems/:id".
router.delete(
  "/deleteitem/:id",
  fetchuser,
  async (req, res) => {
    try {
      let item = await Items.findById(req.params.id)
      if(!item){
        res.status(404).send("item not found")

      }
      // const user = await Items.findOne({user : req.params.id}) this can be easily hacked 

      if(req.user.id !== (item.user).toString()){
        res.status(401).send("Not allowed")
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
