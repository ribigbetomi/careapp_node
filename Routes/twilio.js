const express = require("express");

const twilioRoute = express.Router();

twilioRoute.post("/", async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const userPhone = req.body.phone_number;

  const confirmationCode = generateRandomCode();

  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: `Your confirmation code to Register for Adetomi Application is: ${confirmationCode}`,
      from: twilioPhone,
      to: userPhone,
    })
    .then((message) => console.log(`Message sent with SID: ${message.sid}`))
    .catch((error) => console.error(error));

  console.log(confirmationCode, "cC");
  function generateRandomCode(length = 6) {
    const characters = "0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }
  res.json(confirmationCode);
});

module.exports = twilioRoute;
