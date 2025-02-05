import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config(); // Load environment variables

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

if (!accountSid || !authToken || !whatsappNumber) {
    console.log("Twilio environment variables are missing!");
    throw new Error("Twilio environment variables are missing!");
}

const client = twilio(accountSid, authToken);

console.log(`Twilio client initialized with account SID: ${accountSid}`);

export { client, whatsappNumber };
