const connectDatabase = require("./Config/MongoDB");
const dotenv = require("dotenv");
const express = require("express");
const twilioRoute = require("./Routes/twilio");
const cors = require("cors");
const serviceUserRouter = require("./Routes/serviceUserRoutes");
const serviceUserHandlerRouter = require("./Routes/serviceUserHandlerRoutes");
const careWorkerRouter = require("./Routes/careWorkerRoutes");
const userRouter = require("./Routes/userRoutes");
const visitRouter = require("./Routes/visitRoutes");

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/twilio", twilioRoute);
app.use("/api/serviceUser", serviceUserRouter);
app.use("/api/serviceUserHandler", serviceUserHandlerRouter);
app.use("/api/careWorker", careWorkerRouter);
app.use("/api/user", userRouter);
app.use("/api/visit", visitRouter);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
