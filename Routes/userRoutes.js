const express = require("express");
const asyncHandler = require("express-async-handler");
const { admin } = require("../Middleware/AuthMiddleware");
const User = require("../Models/userModel");

const userRouter = express.Router();

// Register
userRouter.post(
  "/",
  // admin,
  asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, company, accessType, isAdmin } = req.body;

    const userExists = await User.findOne({ phoneNumber });

    if (userExists && userExists.company.name === company.name) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      phoneNumber,
      company,
      accessType,
      isAdmin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phoneNumber: user.phoneNumber,
        accessType: user.accessType,
        company: user.company,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// // Login
// userRouter.post(
//   "/login",
//   asyncHandler(async (req, res) => {
//     const { name, phoneNumber, accessType, email, isAdmin } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         token: generateToken(user._id),
//         createdAt: user.createdAt,
//       });
//     } else {
//       res.status(401);
//       throw new Error("Invalid Email or Password");
//     }
//   })
// );

module.exports = userRouter;
