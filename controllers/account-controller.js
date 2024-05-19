const jwt = require("jsonwebtoken");
const { createAccount, getUser, getUsers } = require("../models/account-model");
const { hashPassword, comparePasswords } = require("../utils/bcrypt");

async function signup(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are missing or incorrect" });
  }

  try {
    const existingUser = await getUser(username);

    if (existingUser.length > 0) {
      return res.status(418).json({ error: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);
    await createAccount(username, hashedPassword);
    res.status(200).json({
      status: "success",
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Error creating account", error);
    res.status(500).json({ message: "Error creating account" });
  }
}
async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are missing or incorrect" });
  }

  try {
    const user = await getUser(username);

    if (user.length === 0) {
      return res.status(404).send("User not found");
    }

    const userData = user[0];

    const validPassword = await comparePasswords(
      password,
      userData.user_password
    );

    if (validPassword) {
      const token = jwt.sign(
        { id: userData.user_id, username: userData.user_name },
        process.env.JWT_SECRET,
        {
          expiresIn: 600,
        }
      );

      res.status(200).json({
        status: "success",
        message: "Login successful",
        token,
      });
    } else {
      res.status(401).send("Wrong password");
    }
  } catch (error) {
    console.error("Error checking password", error);
    res.status(500).send("Internal server error");
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    res.status(200).json({
      message: "Success",
      Users: users,
    });
  } catch (error) {
    console.error("Error could not find users", error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { signup, login, getAllUsers };
