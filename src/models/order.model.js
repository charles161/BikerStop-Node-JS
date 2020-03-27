const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
 date: { type: Date, default: Date.now },
 status: { type: String, default: "Order Placed" },
 paymentMethod: { type: String, default: "COD" },
 user_id: { type: String, required: true },
 item_id: { type: String, required: true },
 quantity: { type: Number, default: 1 }
});


// Export the model
module.exports = mongoose.model('Order', OrderSchema);