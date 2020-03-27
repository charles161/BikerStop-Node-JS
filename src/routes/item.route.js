const express = require('express');

const itemRouter = express.Router();
let error = require('../helpers/responseHandlers/errorHandler')
let success = require('../helpers/responseHandlers/successHandler')
let { sendResponse } = require('../helpers/responseHandlers/responseSender')
const Item = require('../models/item.model');
const Order = require('../models/order.model');


function router() {
 itemRouter.route("/create")
  .post((req, res) => {
   const { name, description, price, quantity, type, image } = req.body

   if (!name || !description || !price || !type) {
    sendResponse(res, 400, error("Some parameters are missing"))
    return
   }

   let newitem = new Item({//creates a new item
    name, //dont need name:name, js is smart enough to refer it
    description,
    price,
    quantity: quantity || 0,
    type,
    image: image || ""
   })

   newitem.save((err) => {
    if (err) {
     sendResponse(res, 400, error("Server Error", err))
     return
    }
    sendResponse(res, 200, success("Item Create Successfully"))
   })

  })

 itemRouter.route('/all')//gets all items
  .get((req, res) => {
   Item.find((err, items) => {
    if (err) {
     sendResponse(res, 400, error("Couldn't get items", err))
    }
    sendResponse(res, 200, success("Successful", items))
   })
  });

 itemRouter.route("/:id")//gets a particular item by id
  .get((req, res) => {
   const { id } = req.params
   Item.findById(id, (err, item) => {
    if (err) {
     sendResponse(res, 400, error("Item not found", err))
    }
    sendResponse(res, 200, success("Successful", item))
   })
  })

 itemRouter.route("/update/:id")//updates an item value
  .post((req, res) => {
   const { id } = req.params
   Item.findByIdAndUpdate(id, {
    ...req.body
   }, (err, item) => {
    if (err) {
     sendResponse(res, 400, error("Item not found", err))
    }
    sendResponse(res, 200, success("Successfully Updated", item))
   })
  })

 itemRouter.route("/:id")//deletes an item
  .delete((req, res) => {
   const { id } = req.params
   Item.findByIdAndDelete(id, (err) => {
    if (err) {
     sendResponse(res, 400, error("Item not found", err))
    }
    Order.deleteMany({
     item_id: id
    }, (err) => {
     if (err) {
      sendResponse(res, 200, success("Successfully deleted"))
      return
     }
     sendResponse(res, 200, success("Successfully deleted", {}))
    })
   })
  })

 return itemRouter;
}

module.exports = router;