const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware");
const generateToken = require("../utils/generateToken");
const CareWorker = require("../Models/careWorkerModel");

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
        isAdmin: careWorker.isAdmin,
        token: generateToken(careWorker._id),
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
      res.status(400);
      throw new Error("CareWorker already exists");
    }

    const careWorker = await CareWorker.create({
      name,
      email,
      password,
      phoneNumber,
      userType,
      userID,
    });

    if (careWorker) {
      res.status(201).json({
        userID: careWorker.userID,
        name: careWorker.name,
        email: careWorker.email,
        phoneNumber: careWorker.phoneNumber,
        userType: careWorker.userType,
        token: generateToken(careWorker._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

module.exports = careWorkerRouter;
