const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const usernameValidation = (username) => {
  return /^[A-Za-z][A-Za-z0-9_]/.test(username);
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    validate: {
      validator: usernameValidation,
      message: (props) => `${props.value} is not a valid username`,
    },
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
