const { Schema, model } = require("mongoose");
const Platform = require('./platform');

/**
 * @typedef ProductSchema
 * @property {string} title - Title of the Product that will be visible in the frontend.
 * @property {string} summary - In the product view, this is the description of the product that will be shown.
 * @property {string} url - Url to the S3 Bucket in AWS where the file of the picture is stored.
 * @property {Schema.Types.ObjectId} platform - This is the ID of the category the product belongs.
 * @property {string} releaseDate - Some product can be available in a certain date, so this field is to specify that date when the product will be available.
 * @property {Array} screenshots - This field contains the array of the url to show other pictures of the product than the main one.
 * @property {Date} updateAt - This field is automatically updated by Strapi after a modification is performed. Once Strapi is deprecated, this field is updated manually.
 * @property {Schema.Types.ObjectId} created_by - Id of the user that created the product.
 * @property {Schema.Types.ObjectId} updated_by - Id of the user who updated the product.
 * @property {number} price - Price of the product.
 * @property {Date} published_at - Automatic field used by Strapi to save the date of this product is publish and available. It's not currently being used.
 * @property {Date} createAt - Automatic field used by Strapi to store the Date of creation.
 * @property {boolean} publish - This field is used to mark a product visible in the main screen or not.
 */

const ProductSchema = new Schema({
  title: String,
  summary: String,
  url: String,
  platform: {
    type: Schema.Types.ObjectId,
    ref: "Platform",
  },
  releaseDate: String,
  screenshots: [{
    url: String,
  }],
  updateAt: Date,
  created_by: Schema.Types.ObjectId,
  updated_by: Schema.Types.ObjectId,
  price: {
    type: Schema.Types.Decimal128,
    get: function (value) {
      return value ? Number(value.toString()) : null;
    },
  },
  published_at: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  publish: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Producto", ProductSchema);
