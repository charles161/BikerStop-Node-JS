const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
 name: { type: String, required: true, max: 100 },
 description: { type: String, required: true, max: 1000 },
 price: { type: Number, required: true },
 type: { type: String, required: true },
 quantity: { type: Number, default: 0 },
 image: { type: String }
});


// Export the model
module.exports = mongoose.model('Item', ItemSchema);