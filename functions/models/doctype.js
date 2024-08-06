const { Schema, model } = require("mongoose");

const DoctypeSchema = new Schema(
  {
    label: String,
    code: String,
    published_at: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: Date,
    created_by: Schema.Types.ObjectId,
    updated_by: Schema.Types.ObjectId,
  },
  {
    collection: "Doctype",
  }
);

module.exports = model("Doctype", DoctypeSchema);
