const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const passwordValidator = require("../utils/passwordValidator");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!passwordValidator(password)) {
    return response.status(400).json({ error: "password too weak" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
