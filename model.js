const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define your schema
const myDataSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String
}, { collection: 'my-collection' });

// Create and export the model
const MyData = mongoose.model('MyData', myDataSchema);
module.exports = MyData;
