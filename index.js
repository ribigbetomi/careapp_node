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

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "AC650d9b44c8f062605e28e4bde15d874c";
// const authToken = "1151e08f8dfbf8a99f1c7243aff76455";
// const verifySid = "VA6e8a90b83325f569c469b6dd24163d95";
// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+447899810854", channel: "sms" })
//   .then((verification) => console.log(verification))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+447899810854", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
