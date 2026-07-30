const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registeredAdmin = require("../models/adminDatabase/registeredAdmin");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../config/multerCloudinary");
const Otp = require("../models/Otp");
const generateOtp = require("../utils/generateOtp");
const transporter = require("../config/email");

// REGISTER USER
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const exists = await registeredAdmin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const admin = await registeredAdmin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Admin registered", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login-admin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await registeredAdmin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "User not found" });

    // compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    // res.json(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: registeredAdmin._id },
       process.env.SECRET_KEY, // use ENV variable in real projects
      { expiresIn: "1h" },
    );

    res.json({ message: "Login successful", token });
    // res.redirect("/home/all_products");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PROTECTED ROUTE
router.get("/me", auth, async (req, res) => {
  try {
    if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
    // req.user comes from jwt.verify in your auth middleware
    const user = await registeredAdmin.findById(req.user.id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;