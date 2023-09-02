const express = require("express");
const asyncHandler = require("express-async-handler");
const { admin } = require("../Middleware/AuthMiddleware");
const User = require("../Models/userModel");
const { default: axios } = require("axios");

const userRouter = express.Router();

// Register
userRouter.post(
  "/",
  // admin,
  asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, company, accessType, isAdmin } = req.body;

    const userExists = await User.findOne({ phoneNumber });

    if (userExists && userExists.company.name === company.name) {
      if (!userExists.withCompany) {
        let withCompany = true;
        await axios.put(
          `http://localhost:5000/api/user/${userExists._id}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
            "content-type": "application/json",
          },
          withCompany
        );
      }
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
      withCompany: true,
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

userRouter.put(
  "/:id",
  admin,
  asyncHandler(async (req, res) => {
    const withCompany = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.withCompany = withCompany;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
        email: updatedUser.email,
      });
    } else {
      res.status(401);
      throw new Error("User not Found");
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
