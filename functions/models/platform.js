const { Schema, model } = require("mongoose");

const PlatformSchema = new Schema({
  title: String,
  url: String,
  position: Number,
  created_by: Schema.Types.ObjectId,
  updated_by: Schema.Types.ObjectId,
  published_at: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Platform", PlatformSchema);
