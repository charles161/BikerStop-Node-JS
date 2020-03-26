const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
 name: { type: String, required: true, max: 100 },
 email: { type: String, required: true, max: 100, unique: true },
 phone: { type: Number, required: true, maxlength: 10 },
 password: { type: String, required: true },
 privilege: { type: String }
});


module.exports = mongoose.model('User', UserSchema);