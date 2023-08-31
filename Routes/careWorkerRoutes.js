const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware");
const generateToken = require("../utils/generateToken");
const CareWorker = require("../Models/careWorkerModel");
const User = require("../Models/userModel");

const careWorkerRouter = express.Router();

// Login
careWorkerRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body;
    const careWorker = await CareWorker.findOne({ phoneNumber });

    if (careWorker && (await careWorker.matchPassword(password))) {
      res.json({
        userID: careWorker.userID,
        name: careWorker.name,
        phoneNumber: careWorker.phoneNumber,
        email: careWorker.email,
        companyName: careWorker.companyName,
        isAdmin: careWorker.isAdmin,
        token: generateToken(careWorker.userID),
        createdAt: careWorker.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// Register
careWorkerRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, userType, userID } = req.body;

    const careWorkerExists = await CareWorker.findOne({ phoneNumber });

    if (careWorkerExists) {
      res.status(201).json({
        _id: careWorkerExists._id,
        name: careWorkerExists.name,
        email: careWorkerExists.email,
        companyName: careWorkerExists.companyName,
        isAdmin: careWorkerExists.isAdmin,
        token: generateToken(careWorkerExists.userID),
      });
    }

    const user = await User.findOne({ phoneNumber });

    if (user) {
      const careWorker = await CareWorker.create({
        name: user.name,
        email: user.email,
        companyName: user.companyName,
        // password,
        phoneNumber: user.phoneNumber,
        userType: user.accessType,
        userID: user._id,
      });

      if (careWorker) {
        res.status(201).json({
          userID: careWorker.userID,
          name: careWorker.name,
          email: careWorker.email,
          companyName: careWorker.companyName,
          phoneNumber: careWorker.phoneNumber,
          userType: careWorker.userType,
          token: generateToken(careWorker.userID),
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    }
  })
);

careWorkerRouter.get(
  "/:userID",
  protect,
  asyncHandler(async (req, res) => {
    //   const { phoneNumber, password } = req.body;
    const careWorker = await CareWorker.findOne({
      userID: req.params.userID,
    }).select("-password");

    if (careWorker) {
      res.json(careWorker);
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

careWorkerRouter.put(
  "/:userID",
  protect,
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    const careWorker = await CareWorker.findOne({ userID: req.params.userID });

    if (careWorker) {
      if (password) {
        careWorker.password = password;
      }
      const updatedCareWorker = await careWorker.save();

      res.json({
        _id: updatedCareWorker._id,
        name: updatedCareWorker.name,
        phoneNumber: updatedCareWorker.phoneNumber,
        email: updatedCareWorker.email,
      });
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

careWorkerRouter.put(
  "/:userID",
  admin,
  asyncHandler(async (req, res) => {
    const { name, phoneNumber, email, availability } = req.body;
    const careWorker = await CareWorker.findOne({ userID: req.params.userID });

    if (careWorker) {
      careWorker.name = name ? name : careWorker.name;
      careWorker.phoneNumber = phoneNumber
        ? phoneNumber
        : careWorker.phoneNumber;
      careWorker.email = email ? email : careWorker.email;
      careWorker.availability = availability
        ? availability
        : careWorker.availability;

      const updatedCareWorker = await careWorker.save();

      res.json({
        _id: updatedCareWorker._id,
        name: updatedCareWorker.name,
        phoneNumber: updatedCareWorker.phoneNumber,
        email: updatedCareWorker.email,
        availabilty: updatedCareWorker.availabilty,
      });
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

module.exports = careWorkerRouter;
