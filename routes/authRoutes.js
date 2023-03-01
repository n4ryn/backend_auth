const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

// This will be our database
let users = {};

router.post("/signup", async (req, res) => {
  try {
    // destructuring name, email and password out of the request body
    const { name, email, password } = req.body;

    const userExist = users.hasOwnProperty(email);

    // Checking if the user with the entered email already exists in the database
    if (userExist) {
      res.send("user exists");
    }

    // Validating Name
    if (!validateName(name)) {
      return res.send("Invalid Name");
    }

    // Validating Email
    if (!validateEmail(email)) {
      return res.send("Invalid Email");
    }

    // Validating Password
    if (!validatePassword(password)) {
      return res.send("Invalid password");
    }

    // Hashing Password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Saving user to the database
    users[email] = { name: name, password: hashedPassword };

    console.log(name, email, password);
    console.log(name, email, hashedPassword);

    res.send("Success");
  } catch (e) {
    res.send("Error");
    console.log(e);
  }
});

router.post("/signin", async (req, res) => {
  try {
    // destructuring email and password out of the request bod
    const { email, password } = req.body;

    // check if the user with the entered email exists in the database
    const userExist = users.hasOwnProperty(email);

    if (email.length === 0) {
      return res.send("Please enter your email");
    }
    if (password.length === 0) {
      return res.send("Please enter your password");
    }

    if (!userExist) {
      res.send("User does not exists");
    }

    // hashes the entered password and then compares it to the hashed password stored in the database
    const passMatch = await bcrypt.compare(password, users[email].password);

    if (!passMatch) {
      res.send("Password Mismatch");
    }

    res.send("sucess");
  } catch (e) {
    res.send("Error");
    console.log(e);
  }
});

module.exports = router;
