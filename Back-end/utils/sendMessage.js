import { client, whatsappNumber } from "../config/twilioConfig.js"; 

const sendWhatsAppMessage = async (to, message) => {
    try {
        if (!to || !message) {
            console.log("Receiver number and message are required.");
            throw new Error("Receiver number and message are required.");
        }

        console.log(`Sending WhatsApp message to ${to}: ${message}`);
        const response = await client.messages.create({
            from: whatsappNumber, // Twilio WhatsApp Sandbox Number
            to: `whatsapp:${to}`, // Receiver's WhatsApp Number
            body: message,
        });

        console.log(`✅ WhatsApp message sent successfully: ${response.sid}`);
        return response.sid;
    } catch (error) {
        console.error("❌ Error sending WhatsApp message:", error.message);
        throw error;
    }
};

export default sendWhatsAppMessage;
