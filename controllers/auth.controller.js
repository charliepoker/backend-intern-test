const models = require("../models");
const Helper = require("../utils/helper");

// Register a user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return res
      .status(400)
      .json({ message: "Please provide username, email and password" });
  }

  //   check if email is valid
  if (!Helper.isValidEmail(email)) {
    return res
      .status(406)
      .json({ message: "Please enter a valid email address" });
  }

  //  check if the number is valid
  if (!Helper.isNumeric(phoneNumber)) {
    return res
      .status(406)
      .json({ message: "Please enter a valid phone number" });
  }

  // check if the email exists in the database
  const emailAlreadyExists = await models.User.findOne({
    where: { email: req.body.email },
  });

  if (emailAlreadyExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashPassword = await Helper.hashPassword(req.body.password);

  const user = await models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    phoneNumber: req.body.phoneNumber,
  });

  res.status(200).json({
    message: "Success",
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });
};

// Sign in a user
const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const user = await models.User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = await Helper.comparePassword(
    user.password,
    password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Please provide correct password",
    });
  }

  const payload = { email: user.email, password: user.password };
  const token = await Helper.generateToken(payload);

  res.status(200).json({
    message: "Logged in successfully 😊 👌",
    token,
  });
};

module.exports = {
  registerUser,
  signInUser,
};
