const express = require("express");
const orderRouter = express.Router();
let error = require("../helpers/responseHandlers/errorHandler");
let success = require("../helpers/responseHandlers/successHandler");
let { sendResponse } = require("../helpers/responseHandlers/responseSender");
const Order = require("../models/order.model");
const Item = require("../models/item.model");
const Shipping = require("../models/shipping.model");
const User = require("../models/user.model");

function router() {
  orderRouter.route("/create").post(async (req, res) => {
    const { user_id, item_id, shipping_id, quantity, paymentMethod } = req.body;

    if (!user_id || !item_id || !shipping_id) {
      sendResponse(res, 400, error("Some parameters are missing"));
      return;
    }

    try {
      await Item.findById(item_id);
      const shippingInfo = await Shipping.findById(shipping_id);
      await User.findById(user_id, "-password");
      if (shippingInfo.user_id != user_id) {
        throw "Parameter Error";
      }
    } catch (err) {
      sendResponse(res, 400, error("Parameter Error"));
      return;
    }

    let neworder = new Order({
      user_id,
      item_id,
      shipping_id,
      quantity: quantity || 1,
      paymentMethod: paymentMethod || "COD"
    });

    neworder.save(err => {
      if (err) {
        sendResponse(res, 400, error("Server Error", err));
        return;
      }
      sendResponse(res, 200, success("Order placed Successfully"));
    });
  });

  orderRouter
    .route("/all") //gets all orders
    .get((req, res) => {
      Order.find(async (err, orders) => {
        if (err) {
          sendResponse(res, 400, error("Couldn't get orders", err));
        }
        let newOrders = [];
        for (let index = 0; index < orders.length; index++) {
          const item = await Item.findById(orders[index].item_id);
          const shippingInfo = await Shipping.findById(orders[index].shipping_id);
          const user = await User.findById(orders[index].user_id, "-password");
          if (item && user && shippingInfo) {
            newOrders.push({ order: orders[index], item, user, shippingInfo });
          } else {
            sendResponse(res, 400, error("Server Error", err));
            return;
          }
        }
        sendResponse(res, 200, success("Successful", newOrders));
      });
    });

  orderRouter
    .route("/all/:user_id") //gets all orders for a particular user_id
    .get((req, res) => {
      const { user_id } = req.params;
      Order.find({ user_id }, async (err, orders) => {
        if (err) {
          sendResponse(res, 400, error("Couldn't get orders", err));
        }
        let newOrders = [];
        for (let index = 0; index < orders.length; index++) {
          const item = await Item.findById(orders[index].item_id);
          const shippingInfo = await Shipping.findById(orders[index].shipping_id);
          if (item && shippingInfo) {
            newOrders.push({ order: orders[index], item, shippingInfo });
          } else {
            sendResponse(res, 400, error("Server Error", err));
            return;
          }
        }
        sendResponse(res, 200, success("Successful", newOrders));
      });
    });

  orderRouter
    .route("/:id") //gets a particular order by id
    .get((req, res) => {
      const { id } = req.params;
      Order.findById(id, (err, order) => {
        if (err) {
          sendResponse(res, 400, error("order not found", err));
        }
        sendResponse(res, 200, success("Successful", order));
      });
    });

  orderRouter
    .route("/update/:id") //updates an order value
    .post((req, res) => {
      const { id } = req.params;
      Order.findByIdAndUpdate(
        id,
        {
          ...req.body
        },
        (err, order) => {
          if (err) {
            sendResponse(res, 400, error("order not found", err));
          }
          sendResponse(res, 200, success("Successfully Updated", order));
        }
      );
    });

  orderRouter
    .route("/:id") //deletes an order
    .delete((req, res) => {
      const { id } = req.params;
      Order.findByIdAndDelete(id, err => {
        if (err) {
          sendResponse(res, 400, error("order not found", err));
        }
        sendResponse(res, 200, success("Successfully deleted", {}));
      });
    });

  return orderRouter;
}

module.exports = router;
