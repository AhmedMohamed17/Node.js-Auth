const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userSchmea = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please Enter an Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please Enter an password"],
    minLength: [6, "min password length is 6 char"],
  },
});
// fire function before doc saved to db
userSchmea.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// static method to login user
userSchmea.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  }
  throw Error("incorrect Email");
};
const User = mongoose.model("user", userSchmea);

module.exports = User;
