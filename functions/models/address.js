const { Schema, model } = require("mongoose");

const AddressSchema = new Schema({
  title: String,
  name: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  phone: String,
  users_permissions_user: Schema.Types.ObjectId,
  formatted_distance: String,
  value_distance: BigInt,
  email_url: String,
});

module.exports = model("Address", AddressSchema);
