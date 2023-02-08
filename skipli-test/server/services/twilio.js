require("dotenv").config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSMS = async (phone, code) => {
  if (!phone) {
    throw "Phone number can't be empty";
  }

  return await client.messages
    .create({
      body: `Hi, this is access code from Skipli ${code}`,
      from: "+13134842481",
      to: phone,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { sendSMS };
