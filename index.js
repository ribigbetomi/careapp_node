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

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "Adetomi App Registration Trial for Code confirmation",
//     to: "+447899810854", // Text your number
//     from: "+447782361338", // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
