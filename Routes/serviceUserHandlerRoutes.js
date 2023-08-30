const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware");
const generateToken = require("../utils/generateToken");
const ServiceUserHandler = require("../Models/serviceUserHandler");
const User = require("../Models/userModel");

const serviceUserHandlerRouter = express.Router();

// Login
serviceUserHandlerRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body;
    const serviceUserHandler = await ServiceUserHandler.findOne({
      phoneNumber,
    });

    if (
      serviceUserHandler &&
      (await serviceUserHandler.matchPassword(password))
    ) {
      res.json({
        userID: serviceUserHandler.userID,
        name: serviceUserHandler.name,
        phoneNumber: serviceUserHandler.phoneNumber,
        email: serviceUserHandler.email,
        isAdmin: serviceUserHandler.isAdmin,
        token: generateToken(serviceUserHandler.userID),
        createdAt: serviceUserHandler.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// Register
serviceUserHandlerRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;

    const serviceUserHandlerExists = await ServiceUserHandler.findOne({
      phoneNumber,
    });

    if (serviceUserHandlerExists) {
      res.status(201).json({
        _id: serviceUserHandlerExists._id,
        name: serviceUserHandlerExists.name,
        email: serviceUserHandlerExists.email,
        isAdmin: serviceUserHandlerExists.isAdmin,
        token: generateToken(serviceUserHandlerExists.userID),
      });
    }

    const user = await User.findOne({ phoneNumber });

    if (user) {
      const serviceUserHandler = await ServiceUserHandler.create({
        name: user.name,
        email: user.email,
        // password,
        phoneNumber,
        userType: user.accessType,
        userID: user._id,
      });

      if (serviceUserHandler) {
        res.status(201).json({
          _id: serviceUserHandler._id,
          name: serviceUserHandler.name,
          email: serviceUserHandler.email,
          isAdmin: serviceUserHandler.isAdmin,
          token: generateToken(serviceUserHandler.userID),
        });
      }
    }
  })
);

serviceUserHandlerRouter.get(
  "/:userID",
  protect,
  asyncHandler(async (req, res) => {
    //   const { phoneNumber, password } = req.body;
    const serviceUserHandler = await ServiceUserHandler.findOne({
      userID: req.params.userID,
    }).select("-password");

    if (serviceUserHandler) {
      res.json(serviceUserHandler);
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
    const { name, phoneNumber, email, availability } = req.body;
    const careWorker = await CareWorker.findOne({ userID: req.params.userID });

    if (careWorker) {
      careWorker.name = name || careWorker.name;
      careWorker.phoneNumber = phoneNumber || careWorker.phoneNumber;
      careWorker.email = email || careWorker.email;
      careWorker.availability = availability || careWorker.availability;

      if (req.body.password) {
        careWorker.password = req.body.password;
      }
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

module.exports = serviceUserHandlerRouter;
