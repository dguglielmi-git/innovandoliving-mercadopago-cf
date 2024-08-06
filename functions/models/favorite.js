const { Schema, model } = require("mongoose");
const Product = require('./product');

const FavoriteSchema = new Schema({
  created_by: Schema.Types.ObjectId,
  updated_by: Schema.Types.ObjectId,
  users_permissions_user: Schema.Types.ObjectId,
  producto: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
  },
  published_at: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Favorite", FavoriteSchema);
