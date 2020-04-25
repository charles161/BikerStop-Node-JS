const express = require("express");
const shippingRouter = express.Router();
let error = require("../helpers/responseHandlers/errorHandler");
let success = require("../helpers/responseHandlers/successHandler");
let { sendResponse } = require("../helpers/responseHandlers/responseSender");
const Shipping = require("../models/shipping.model");
const User = require("../models/user.model");

function router() {
  shippingRouter.route("/create").post(async (req, res) => {
    const { user_id, flatAndStreet, city, pincode, province, country } = req.body;

    if (!user_id || !flatAndStreet || !city || !pincode || !province || !country) {
      sendResponse(res, 400, error("Some parameters are missing"));
      return;
    }

    try {
      await User.findById(user_id, "-password");
    } catch (err) {
      sendResponse(res, 400, error("Parameter Error"));
      return;
    }

    let newShipping = new Shipping({
      user_id,
      flatAndStreet,
      city,
      pincode,
      province,
      country
    });

    newShipping.save(err => {
      if (err) {
        sendResponse(res, 400, error("Server Error", err));
        return;
      }
      sendResponse(res, 200, success("Shipping Info saved Successfully"));
    });
  });

  shippingRouter.route("/all/:user_id").get((req, res) => {
    const { user_id } = req.params;
    Shipping.find({ user_id }, async (err, shippingInfos) => {
      if (err) {
        sendResponse(res, 400, error("Couldn't get shipping info", err));
      }
      sendResponse(res, 200, success("Successful", shippingInfos));
    });
  });

  shippingRouter.route("/:id").get((req, res) => {
    const { id } = req.params;
    Shipping.findById(id, (err, shipping) => {
      if (err) {
        sendResponse(res, 400, error("Shipping info not found", err));
      }
      sendResponse(res, 200, success("Successful", shipping));
    });
  });

  shippingRouter.route("/update/:id").post((req, res) => {
    const { id } = req.params;
    Shipping.findByIdAndUpdate(
      id,
      {
        ...req.body
      },
      (err, shipping) => {
        if (err) {
          sendResponse(res, 400, error("Shipping info not found", err));
        }
        sendResponse(res, 200, success("Successfully Updated", shipping));
      }
    );
  });

  shippingRouter.route("/:id").delete((req, res) => {
    const { id } = req.params;
    Shipping.findByIdAndDelete(id, err => {
      if (err) {
        sendResponse(res, 400, error("Shipping info not found", err));
      }
      sendResponse(res, 200, success("Successfully deleted", {}));
    });
  });

  return shippingRouter;
}

module.exports = router;
