var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DataSchema = new Schema({
  id: {type: String},
  sender_id: {type: String},
  step: {type: String},
  lastMsgDate: {type: String},
  flight: {type: String},
  flightDate: {type: String},
  language: {type: String}
});

module.exports = mongoose.model("Data", DataSchema);


// 
// SELECT * FROM `flight` WHERE `sender_id` = '123456';
// REPLACE INTO `flight` (lastMsgDate, flight) VALUES (11:12:34, AT800);
