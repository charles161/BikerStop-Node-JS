const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShippingSchema = new Schema({
  date: { type: Date, default: Date.now },
  flatAndStreet: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: Number, required: true },
  user_id: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("Shipping", ShippingSchema);
