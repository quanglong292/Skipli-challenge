const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone: Number,
  code: String,
  likes: Array,
});

module.exports = mongoose.model("User", UserSchema);
