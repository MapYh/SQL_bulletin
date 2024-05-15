const { createAccount } = require("../models/account-model");
const { hashPassword } = require("../utils/bcrypt");


async function signup (req,res) {
    const { user_name, user_password} = req.body

    if (!user_name || !user_password) {
        return res.status(400).json({ error: "Username and password are missing or incorrect" });
      }

      try {
        const hashedPassword = await hashPassword(user_password)
        await createAccount (user_name, hashedPassword)
        res.status(200).json({
            status: "success",
            message: "Account created successfully"
        });
      } catch (error) {
        console.error("Error creating account", error);
        res.status(500).json({ message: "Error creating account" });
      }
}


module.exports = { signup }