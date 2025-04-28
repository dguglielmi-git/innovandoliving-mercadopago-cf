const { Schema, model } = require('mongoose')

const ConfigurationSchema = new Schema({
  address_delivery_center: String,
  km_minimum: Number,
  km_price: {
    type: Schema.Types.Decimal128,
    get: function (value) {
      return value ? Number(value.toString()) : null
    }
  },
  published_at: {
    type: Date,
    default: Date.now
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: Date,
  created_by: Schema.Types.ObjectId,
  updated_by: Schema.Types.ObjectId,
  footer_text: String,
  facebook_url: String,
  instagram_url: String,
  twitter_url: String,
  whatsapp_num: String,
  email_url: String,
  external_provider_price: Number
})

module.exports = model('Configuration', ConfigurationSchema)
