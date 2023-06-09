const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  screenshots: [{}],
  summary: String,
  title: String,
  url: String,
  price: {
    type: Schema.Types.Decimal128,
    get: function (value) {
      return value ? Number(value.toString()) : null;
    },
  },
  releaseDate: String,
  published_at: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: Date,
  created_by: Schema.Types.ObjectId,
  poster: Schema.Types.ObjectId,
  updated_by: Schema.Types.ObjectId,
  platform: Schema.Types.ObjectId,
});

module.exports = model("Producto", ProductSchema);
