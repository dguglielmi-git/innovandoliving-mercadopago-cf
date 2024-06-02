const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    confirmed: Boolean,
    blocked: Boolean,
    name: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    provider: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: Date,
    role: Schema.Types.ObjectId,
    isOwner: Number,
    updated_by: Schema.Types.ObjectId,
    language: String,
  },
  {
    collection: "users-permissions_user",
  }
);

module.exports = model("users-permissions_user", UserSchema);
