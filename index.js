const connectDatabase = require("./Config/MongoDB");
const dotenv = require("dotenv");
const express = require("express");
const twilioRoute = require("./Routes/twilio");
const cors = require("cors");

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/twilio", twilioRoute);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
