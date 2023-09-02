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
        company: serviceUserHandler.company,
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
        userID: serviceUserHandlerExists.userID,
        name: serviceUserHandlerExists.name,
        email: serviceUserHandlerExists.email,
        company: serviceUserHandlerExists.company,
        isAdmin: serviceUserHandlerExists.isAdmin,
        token: generateToken(serviceUserHandlerExists.userID),
      });
    }

    const user = await User.findOne({ phoneNumber });

    if (user) {
      const serviceUserHandler = await ServiceUserHandler.create({
        name: user.name,
        email: user.email,
        company: user.company,
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
          company: serviceUserHandler.company,
          isAdmin: serviceUserHandler.isAdmin,
          token: generateToken(serviceUserHandler.userID),
        });
      }
    }
  })
);

// // Update password
serviceUserHandlerRouter.put(
  "/:userID",
  protect,
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    const serviceUserHandler = await ServiceUserHandler.findOne({
      userID: req.params.userID,
    });

    if (serviceUserHandler) {
      if (password) {
        serviceUserHandler.password = password;
      }
      const updatedServiceUserHandler = await serviceUserHandler.save();

      res.json({
        _id: updatedServiceUserHandler._id,
        name: updatedServiceUserHandler.name,
        phoneNumber: updatedServiceUserHandler.phoneNumber,
        email: updatedServiceUserHandler.email,
      });
    } else {
      res.status(401);
      throw new Error("User not Found");
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

serviceUserHandlerRouter.put(
  "/:userID",
  admin,
  asyncHandler(async (req, res) => {
    const { name, phoneNumber, email, availability } = req.body;
    const serviceUserHandler = await ServiceUserHandler.findOne({
      userID: req.params.userID,
    });

    if (serviceUserHandler) {
      serviceUserHandler.name = name ? name : serviceUserHandler.name;
      serviceUserHandler.phoneNumber = phoneNumber
        ? phoneNumber
        : serviceUserHandler.phoneNumber;
      serviceUserHandler.email = email ? email : serviceUserHandler.email;
      serviceUserHandler.availability = availability
        ? availability
        : serviceUserHandler.availability;

      const updatedServiceUserHandler = await serviceUserHandler.save();

      res.json({
        _id: updatedServiceUserHandler._id,
        name: updatedServiceUserHandler.name,
        phoneNumber: updatedServiceUserHandler.phoneNumber,
        email: updatedServiceUserHandler.email,
        availabilty: updatedServiceUserHandler.availabilty,
      });
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

module.exports = serviceUserHandlerRouter;
